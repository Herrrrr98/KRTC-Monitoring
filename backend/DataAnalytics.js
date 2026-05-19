const fs = require('fs');
const curnt_time = require('./function_curnt_time');
const config = require('./config.json');
const TrainClass = require('./KRTC-TrData.json');

function timeToMin(timearr){
    return Number(timearr.split(":")[0] * 60) + Number(timearr.split(":")[1]);
};

async function DataAnalytics() {
    try{
        
        var triptime_results = [];
        var folders = fs.readdirSync(config.src_Folder, { withFileTypes: true }).filter(counts => counts.isDirectory());
        for(let repeat = 0; repeat < folders.length; repeat++){
            var folderPath = config.src_Folder + '/' + folders[repeat].name;
            var files = fs.readdirSync(folderPath);
            var filescount = files.length;
            for(let inner_repeat = 0; inner_repeat < filescount; inner_repeat++){
                var fileName = files[inner_repeat];
                var file = fs.readFileSync(folderPath + '/'+ fileName, 'utf-8');
                var contents = file.split("+");
                contents.splice(0,1); //(contents[0] is empty, causing train&time would lose a data.)
                var train = [], time = [];
                for(let analytics_foreach = 0; analytics_foreach < contents.length; analytics_foreach++){
                    train.push(contents[analytics_foreach].split(" | ")[1].trim());
                    time.push(contents[analytics_foreach].split(" | ")[0].trim());
                };
                var currentStartStation = null;
                var currentStartTime = null;
                for(let i = 0; i < train.length; i++){
                    const currentStation = train[i];
                    const currentTime = time[i];
                    if(currentStartStation === null){
                        if(currentStation === "R3" || currentStation === "RK1" || currentStation === "O1" || currentStation === "OT1"){
                            currentStartStation = currentStation;
                            currentStartTime = currentTime;
                        };
                    }else if(currentStartStation === "R3"){
                        if(currentStation === "RK1"){
                            const startTimeMin = timeToMin(currentStartTime);
                            const endTimeMin = timeToMin(currentTime);
                            triptime_results.push({
                                "Date": folders[repeat].name,
                                "Class": TrainClass.Train[Number(String(fileName[3])+String(fileName[4]))-1],
                                "heading": TrainClass.system.G,
                                "TripStartTime": currentStartTime,
                                "TripEndTime": currentTime,
                                "TripTime": String(endTimeMin-startTimeMin)+String(" Minutes")
                            });
                            currentStartStation = "RK1" //next start
                            currentStartTime = currentTime;
                        }else if(currentStation === "RK1"){
                            currentStartTime = currentTime;
                        };
                    }else if(currentStartStation === "RK1"){
                        if(currentStation === "R3"){
                            const startTimeMin = timeToMin(currentStartTime);
                            const endTimeMin = timeToMin(currentTime);
                            triptime_results.push({
                                "Date": folders[repeat].name,
                                "Class": TrainClass.Train[Number(String(fileName[3])+String(fileName[4]))-1],
                                "heading": TrainClass.system.S,
                                "TripStartTime": currentStartTime,
                                "TripEndTime": currentTime,
                                "TripTime": String(endTimeMin-startTimeMin)+String(" Minutes")
                            });
                            currentStartStation = "R3";
                            currentStartTime = currentTime;
                        }else if(currentStation === "RK1"){
                            currentStartTime = currentTime;
                        }
                    }else if(currentStartStation === "OT1"){
                        if(currentStation === "O1"){
                            const startTimeMin = timeToMin(currentStartTime);
                            const endTimeMin = timeToMin(currentTime);
                            triptime_results.push({
                                "Date": folders[repeat].name,
                                "Class": TrainClass.Train[Number(String(fileName[3])+String(fileName[4]))-1],
                                "heading": TrainClass.system.H,
                                "TripStartTime": currentStartTime,
                                "TripEndTime": currentTime,
                                "TripTime": String(endTimeMin-startTimeMin)+String(" Minutes")
                            });
                            currentStartStation = "O1";
                            currentStartTime = currentTime;
                        }else if(currentStation === "OT1"){
                            currentStartTime = currentTime;
                        }
                    }else if(currentStartStation === "O1"){
                        if(currentStation === "OT1"){
                            const startTimeMin = timeToMin(currentStartTime);
                            const endTimeMin = timeToMin(currentTime);
                            triptime_results.push({
                                "Date": folders[repeat].name,
                                "Class": TrainClass.Train[Number(String(fileName[3])+String(fileName[4]))-1],
                                "heading": TrainClass.system.D,
                                "TripStartTime": currentStartTime,
                                "TripEndTime": currentTime,
                                "TripTime": String(endTimeMin-startTimeMin)+String(" Minutes")
                            });
                            currentStartStation = "OT1";
                            currentStartTime = currentTime;
                        }else if(currentStation === "O1"){
                            currentStartTime = currentTime;
                        }
                    }
                }
            }
        }
        return {alive: true, data: triptime_results};
    }catch(e){
        console.error(e);
        return {alive: false, data: null};
    }
};

module.exports = DataAnalytics;