import React, { Component } from 'react';

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import Api from "../api";
import {parse} from "querystring";
import NavBar from './NavBar';

const data4 = [
    {subject: 'Math', A: 0.1, fullMark: 1,},
    {subject: 'Chinese', A: 0.6, fullMark: 1,},
    {subject: 'English', A: 0.7, fullMark: 1,},
    {subject: 'Geography', A: 1, fullMark: 1,},
    {subject: 'Physics', A: 1, fullMark: 1,},
    {subject: 'History', A: 1, fullMark: 1,},
];

const stack_bar_chart_sampe = [
    {
      name: 'Page A', Anger: 4000, Fear: 2400, Joy: 2400,
    },
    {
      name: 'Page B', Anger: 3000, Fear: 1398, Joy: 2210,
    },
    {
      name: 'Page C', Anger: 2000, Fear: 9800, Joy: 2290,
    },
    {
      name: 'Page D', Anger: 2780, Fear: 3908, Joy: 2000,
    },
    {
      name: 'Page E', Anger: 1890, Fear: 4800, Joy: 2181,
    },
    {
      name: 'Page F', Anger: 2390, Fear: 3800, Joy: 2500,
    },
    {
      name: 'Page G', Anger: 3490, Fear: 4300, Joy: 0,
    },
  ];


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    let history_res = await Api.prolyzer_user_history(user.username);
                    data = {'tone' : tone_res.data['tone_response'], 'history' : history_res.data['db_response']};
                } else {
                    data = await Api.prolyzer(search);
                }
                this.setState({prolyzer: data});
            } else {
                throw new Error("Search param failed parsing.");
            }
        } catch (e) {
            console.warn(e);
            this.props.history.push("/");
        }
    };

    render() {
        const {prolyzer} = this.state;
        console.log(prolyzer); // TODO @hung data is stored and updated here (i.e. this.state.prolyzer)

        
        let radar_chart_data = [];
        let stack_chart_data = [];
        let search_term = "";
        if (prolyzer && this.props.appAuth.getUser()) {
            let tones = {
                'Anger' : 0.5, 'Fear' : 0.5, 'Joy' : 0.5, 'Sadness' : 0.5, 'Analytical' : 0.5, 'Confident' : 0.5, 'Tentative' : 0.5
            }
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

            let valid_item = {};
            Object.keys(prolyzer["history"]).map(key => {
                let item = {'name': 'Page A', 'Anger': 0.0, 'Fear': 0.0, 'Joy': 0.0, 'Sadness': 0.0, 'Analytical': 0.0, 'Confident': 0.0, 'Tentative' : 0.0};
                let entry  = prolyzer["history"][key];
                let searh_term = entry['search_term'];
                if (searh_term !== "") {
                    if(!valid_item.hasOwnProperty(searh_term)) {
                        valid_item[searh_term] = 1;
                        item["name"] = searh_term;
                        let entry_tone1 = entry['tonename1'];
                        let entry_tone2 = entry['tonename2'];
                        if (entry_tone1 && entry_tone1 !== "null") {
                            item[entry_tone1] = entry['score1'];
    
                        }
                
                        if (entry_tone2 && entry_tone2 !== "null") {
                            item[entry_tone2] = entry['score2'];
                        }
                        stack_chart_data.push(item);
                    } 
                }

            return key;
            });

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

                    <RadarChart cx={280} cy={250} outerRadius={250} width={600} height={600} data={radar_chart_data}>
                        <PolarGrid/>
                        <PolarAngleAxis dataKey="subject"/>
                        <PolarRadiusAxis/>
                        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                    </RadarChart>
                </div>
                <div align="center">
                <h1>{this.props.appAuth.getUser() ? this.props.appAuth.getUser().username + " analyzed with prolyzer in the past" : ""}</h1>

                    <BarChart
                        width={1000}
                        height={500}
                        data={stack_chart_data}
                        margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 3]}/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Anger" stackId="a" fill="#FF0000" />
                        <Bar dataKey="Fear" stackId="a" fill="#FE9A2E" />
                        <Bar dataKey="Joy" stackId="a" fill="#00BFFF" />
                        <Bar dataKey="Sadness" stackId="a" fill="#A4A4A4" />
                        <Bar dataKey="Analytical" stackId="a" fill="#8904B1" />
                        <Bar dataKey="Confident" stackId="a" fill="#01DFD7" />
                        <Bar dataKey="Tentative" stackId="a" fill="#F7FE2E" />
                    </BarChart>
                </div>

            </div>
        );
    }
}

export default Dashboard;