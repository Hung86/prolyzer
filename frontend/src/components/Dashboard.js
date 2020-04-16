import React, { Component } from 'react';

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

import Api from "../api";
import {parse} from "querystring";
import NavBar from './NavBar';



const toPercent = (decimal, fixed = 0) => `${(decimal).toFixed(fixed)}%`;

class CustomizedAxisTick extends Component {
  render() {
    const {
      x, y, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" fontSize={12} transform="rotate(-45)">{payload.value}</text>
      </g>
    );
  }
}

const data4 = [
    {subject: 'Math', A: 0.1, fullMark: 1,},
    {subject: 'Chinese', A: 0.6, fullMark: 1,},
    {subject: 'English', A: 0.7, fullMark: 1,},
    {subject: 'Geography', A: 1, fullMark: 1,},
    {subject: 'Physics', A: 1, fullMark: 1,},
    {subject: 'History', A: 1, fullMark: 1,},
];

const stack_bar_chart_sampe = [
    {name: 'Page A', Anger: 4000, Fear: 2400, Joy: 2400,},
    {name: 'Page B', Anger: 3000, Fear: 1398, Joy: 2210,},
    {name: 'Page C', Anger: 2000, Fear: 9800, Joy: 2290,},
    {name: 'Page D', Anger: 2780, Fear: 3908, Joy: 2000,},
    {name: 'Page E', Anger: 1890, Fear: 4800, Joy: 2181,},
    {name: 'Page F', Anger: 2390, Fear: 3800, Joy: 2500,},
    {name: 'Page G', Anger: 3490, Fear: 4300, Joy: 0,},
  ];


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            prolyzer: null
        };
    }

    componentDidMount = async () => {
        try {
            const searchParamsPart = this.props.location.search;
            if (searchParamsPart.split('?').length > 1 && !!parse(searchParamsPart.split('?')[1]).search) {
                const {search} = parse(searchParamsPart.split('?')[1]);
                let user = this.props.appAuth.getUser();
                let data;
                if (user) {
                    let tone_res = await Api.prolyzer(search,user.username);
                    let last_10_days_res = await Api.prolyzer_last_10_days(search,user.username)
                    data = {'tone' : tone_res.data['tone_response'], 'history' : last_10_days_res.data['db_response']};
                    this.setState({prolyzer: data, isAuthenticated: true});
                } else {
                    let tone_res = await Api.prolyzer(search, "anonymous");
                    let history_res = await Api.prolyzer_user_history("anonymous");
                    data = {'tone' : tone_res.data['tone_response'], 'history' : history_res.data['db_response']};
                    this.setState({prolyzer: data, isAuthenticated: false});
                }
            } else {
                throw new Error("Search param failed parsing.");
            }
        } catch (e) {
            console.warn(e);
            this.props.history.push("/");
        }
    };

    render() {
        const {prolyzer, isAuthenticated} = this.state;
        console.log(prolyzer);

        let radar_chart_data = [];
        let stack_chart_data = [];
        let search_term = "";
        if (prolyzer) {
            let tones = {Anger: 0.1, Fear: 0.1, Joy: 0.1, Sadness: 0.1, Analytical: 0.1, Confident: 0.1, Tentative: 0.1};
            search_term = prolyzer['tone']["search_term"];
            let tone1 = prolyzer['tone']['tonename1'];
            let tone2 = prolyzer['tone']['tonename2'];
            if (tone1 && tone1 !== "null") {
                tones[tone1] = prolyzer['tone']['score1'];
            }
    
            if (tone2 && tone2 !== "null") {
                tones[tone2] = prolyzer['tone']['score2'];
            }

            Object.keys(tones).map(key => {
                radar_chart_data.push({subject: key, A: tones[key], fullMark: 1});
                return key;
              });
            
            if (prolyzer.hasOwnProperty("history")) {
               // let valid_item = {};
               let len = prolyzer["history"].length;
               console.log("history length : " + len);
               let start_idx = len - 20;
               for (; start_idx < len; start_idx++) {
                  let item = {'name': 'Page A', 'Anger': 0.0, 'Fear': 0.0, 'Joy': 0.0, 'Sadness': 0.0, 'Analytical': 0.0, 'Confident': 0.0, 'Tentative' : 0.0};
                  let entry  = prolyzer["history"][start_idx];
                  let created_at = entry['created_at'];
                  console.log("day: " + created_at);  

                  item["name"] = created_at;
                
                  let entry_tone1 = entry['tonename1'];
                  let entry_tone2 = entry['tonename2'];
                  if (entry_tone1 && entry_tone1 !== "null") {
                      item[entry_tone1] = (entry['score1']*100).toFixed(2);

                  }
          
                  if (entry_tone2 && entry_tone2 !== "null") {
                      item[entry_tone2] = (entry['score2']*100).toFixed(2);
                  }
                  stack_chart_data.push(item);
                }
            }

        } else {
            radar_chart_data = data4;
            stack_chart_data = stack_bar_chart_sampe;
        }


        return !prolyzer ? (
            <div className="container my-5">
                <div className="text-center">Loading...</div>
            </div>
        ) : (
            <div>
                <NavBar appAuth={this.props.appAuth}/>
                
                <div align="center" >
                <h1>{search_term}</h1>
                    <RadarChart cx={300} cy={260} outerRadius={225} width={600} height={520} data={radar_chart_data}>
                        <PolarGrid/>
                        <PolarAngleAxis dataKey="subject"/>
                        <PolarRadiusAxis/>
                        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                    </RadarChart>
                </div>
                {isAuthenticated &&
                (<div align="center">
                <h1>Past Analyses:</h1>

                    <LineChart width={1000} height={650} data={stack_chart_data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" height={110} interval={0}  tick={<CustomizedAxisTick />} padding={{ left: 30, right: 30 }}/>
                        <YAxis domain={[0, 100]} tickFormatter={toPercent} />
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" dataKey="Anger"  stroke="#FF0000" />
                        <Line type="monotone" dataKey="Fear"  stroke="#FE9A2E" />
                        <Line type="monotone" dataKey="Joy"  stroke="#00BFFF" />
                        <Line type="monotone" dataKey="Sadness"  stroke="#A4A4A4" />
                        <Line type="monotone" dataKey="Analytical" stroke="#8904B1" />
                        <Line type="monotone" dataKey="Confident"  stroke="#01DFD7" />
                        <Line type="monotone" dataKey="Tentative" stroke="#FFCA33" />
                    </LineChart>
                </div>)
                }

            </div>
        );
    }
}

export default Dashboard;