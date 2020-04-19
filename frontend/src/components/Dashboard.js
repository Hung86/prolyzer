import React, { Component } from 'react';

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    BarChart,
    Bar,
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


const moment = require('moment');

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

  const composed_chart_sample = [
    {
      name: 'Page A', uv: 590, pv: 800, amt: 1400,
    },
    {
      name: 'Page B', uv: 868, pv: 967, amt: 1506,
    },
    {
      name: 'Page C', uv: 1397, pv: 1098, amt: 989,
    },
    {
      name: 'Page D', uv: 1480, pv: 1200, amt: 1228,
    },
    {
      name: 'Page E', uv: 1520, pv: 1108, amt: 1100,
    },
    {
      name: 'Page F', uv: 1400, pv: 680, amt: 1700,
    },
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
                    let hashtag_all_res = await Api.prolyzer_hash_tag(search);
                    let last_10_days_res = await Api.prolyzer_last_10_days(search,user.username)
                    let history_all_res = await Api.prolyzer_user_history(user.username);

                    data = {'tone' : tone_res.data['tone_response'],
                            'history' : last_10_days_res.data['db_response'],
                            'history_all' : history_all_res.data['db_response'],
                            'hash_tag' : hashtag_all_res.data['db_response']};
                    this.setState({prolyzer: data, isAuthenticated: true});
                } else {
                    let tone_res = await Api.prolyzer(search, "anonymous");
                    let hashtag_all_res = await Api.prolyzer_hash_tag(search);
                    data = {'tone' : tone_res.data['tone_response'], 'hash_tag' : hashtag_all_res.data['db_response']};
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
        let line_chart_data = [];
        let stack_chart_data = [];
        let composed_chart_data = [];
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

               for (let start_idx = len-1; start_idx > -1 ; start_idx--) {
                    let item = {'name': 'Page A', 'Anger': 0.0, 'Fear': 0.0, 'Joy': 0.0, 'Sadness': 0.0, 'Analytical': 0.0, 'Confident': 0.0, 'Tentative' : 0.0};
                    let entry  = prolyzer["history"][start_idx];
                    let created_at = entry['created_at'];
                    console.log("day: " + created_at);  
                    let utc_time = created_at + " UTC"
                    let local_time = new Date(utc_time);
                
                    item["name"] = moment(local_time).format('lll');
                    
                    let entry_tone1 = entry['tonename1'];
                    let entry_tone2 = entry['tonename2'];
                    if (entry_tone1 && entry_tone1 !== "null") {
                        item[entry_tone1] = (entry['score1']*100).toFixed(2);

                    }
          
                    if (entry_tone2 && entry_tone2 !== "null") {
                        item[entry_tone2] = (entry['score2']*100).toFixed(2);
                    }
                    line_chart_data.splice(0,0,item);

                    if (line_chart_data.length > 20) {
                        break;
                    }
                }

            }

            if (prolyzer.hasOwnProperty("history_all")) {
                let valid_item = {};
                let ordered_search = []
                let len = prolyzer["history_all"].length;
                console.log("history_all length : " + len);       
 
                for (let start_idx = len-1; start_idx > -1 ; start_idx--) {
                   let entry  = prolyzer["history_all"][start_idx];
                   let search_term_2 = entry['search_term'];
                   if (search_term_2 !== "") {
                        if(!valid_item.hasOwnProperty(search_term_2)) {
                            valid_item[search_term_2] = 1;
                            if (ordered_search.length < 21) {
                                ordered_search.splice(0,0,search_term_2);
                            }
                        } else {
                            valid_item[search_term_2] += 1;

                        }
                   }
                }

                let len2 = ordered_search.length

                for (let start_idx2 = 0; start_idx2 < len2; start_idx2++) {
                    let item = {'name': 'Page A', 'count': 0};
                    let search_term_3  = ordered_search[start_idx2];
                    item["name"] = search_term_3;
                    item["count"] = valid_item[search_term_3]
                    stack_chart_data.push(item);
                }
            }

            if (prolyzer.hasOwnProperty("hash_tag")) {
                let len = prolyzer["hash_tag"].length;
                console.log("hash_tag length : " + len);       
                let limit_len = 5;
                if (len < 5) {
                    limit_len = len;
                }

                for (let start_idx = 0; start_idx < limit_len; start_idx++) {
                   let entry  = prolyzer["hash_tag"][start_idx];

                   composed_chart_data.push(entry);

                }
            }

        } else {
            radar_chart_data = data4;
            line_chart_data = stack_bar_chart_sampe;
            stack_chart_data = stack_bar_chart_sampe;
            composed_chart_data = composed_chart_sample
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
                        <br></br>

                </div>
                <div align="center">
                    <table width="40%">
                        <thead>
                            <tr>
                                <th  width="10%">Index</th>
                                <th>Hashtag Co-occurence Matrix</th> 
                                <th   width="10%">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                composed_chart_data.map((hashtag_item, index)=>{
                                return (<tr>
                                            <td >{index}</td>
                                            <td>{hashtag_item['hashtags']}</td>
                                            <td >{hashtag_item['count']}</td>
                                        </tr>)
                                 })
                            }
                        </tbody>
                    </table>
                </div>
                <br/>
                {isAuthenticated &&
                (<div align="center">
                <h1>Sentiment Scoring Timline</h1>

                    <LineChart width={1000} height={650} data={line_chart_data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" height={120} interval={0}  tick={<CustomizedAxisTick />} padding={{ left: 30, right: 30 } } label={{ value: 'Datetime', position: 'insideBottomRight', offset: 0 }}/>
                        <YAxis domain={[0, 100]} tickFormatter={toPercent} label={{ value: 'Twitter Sentiment', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" dataKey="Anger"  stroke="#FF0000" unit="%"/>
                        <Line type="monotone" dataKey="Fear"  stroke="#FE9A2E" unit="%"/>
                        <Line type="monotone" dataKey="Joy"  stroke="#00BFFF" unit="%"/>
                        <Line type="monotone" dataKey="Sadness"  stroke="#A4A4A4" unit="%"/>
                        <Line type="monotone" dataKey="Analytical" stroke="#8904B1" unit="%"/>
                        <Line type="monotone" dataKey="Confident"  stroke="#01DFD7" unit="%"/>
                        <Line type="monotone" dataKey="Tentative" stroke="#FFCA33" unit="%"/>
                    </LineChart>

                    <br/>
                    <h1>Tweet Fequency Analysis</h1>

                    <BarChart
                        width={1040}
                        height={650}
                        data={stack_chart_data}
                        margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" height={110} interval={0}  tick={<CustomizedAxisTick />} label={{ value: 'Hashtags/Mentions', position: 'insideBottomRight', offset: 0 }}/>
                        <YAxis  label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" stackId="a" fill="#00BFFF"/>

                    </BarChart>
                </div>
                
                )
                }

            </div>
        );
    }
}

export default Dashboard;