const fs = require('fs');
const path = require('path');
const curnt_time = require('./function_curnt_time');
const config = require('../config.json');
const TrainClass = require('./KRTC-TrData.json');

function timeToMin(timearr){
    return Number(timearr.split(":")[0] * 60) + Number(timearr.split(":")[1]);
};

async function SwitchMachineDetector() {
    const abs_src_folder = path.resolve(__dirname, config.src_Folder);
    try{
        var detected_results = [];
        var folders = fs.readdirSync(abs_src_folder, { withFileTypes: true }).filter(counts => counts.isDirectory());
        for(let repeat = 0; repeat < folders.length; repeat++){
            var folderPath = path.join(abs_src_folder, folders[repeat].name);
            var files = fs.readdirSync(folderPath);
            var filescount = files.length;
            for(let inner_repeat = 0; inner_repeat < filescount; inner_repeat++){
                var fileName = files[inner_repeat];
                var file = fs.readFileSync(path.join(folderPath, fileName), 'utf-8');
                var contents = file.split("+");
                contents.splice(0,1); //(contents[0] is empty, causing train&time would lose a data.)
                var train = [], time = [];
                for(let analytics_foreach = 0; analytics_foreach < contents.length; analytics_foreach++){
                    train.push(contents[analytics_foreach].split(" | ")[1].trim());
                    time.push(contents[analytics_foreach].split(" | ")[0].trim());
                };
                for(let i = 0; i < train.length-1; i++){ //There's no data after train[train.length-1], thus set the limit to train.length-1
                    const System_of_Train_Now = train[i];
                    const System_of_Train_Then = train[i+1];
                    if(System_of_Train_Now[0] === "R" && System_of_Train_Then[0] === "O" || System_of_Train_Now[0] === "O" && System_of_Train_Then[0] === "R"){
                        if(TrainClass.Train[Number(String(fileName[3])+String(fileName[4]))-1])
                        detected_results.push({
                            "Date": folders[repeat].name,
                            "Time": `${time[i]} --> ${time[i+1]}`,
                            "Class": TrainClass.Train[Number(String(fileName[3])+String(fileName[4]))-1],
                            "Previous System": System_of_Train_Now,
                            "Current System": System_of_Train_Then
                        })
                        else detected_results.push({
                            "Date": folders[repeat].name,
                            "Time": `${time[i]} --> ${time[i+1]}`,
                            "Class": "Could Not get the Class Number due to source file errors",
                            "FileName": path.join(folderPath, fileName),
                            "Previous System": System_of_Train_Now,
                            "Current System": System_of_Train_Then
                        })
                    }
                }
            }
        }
        return {alive: true, data: detected_results};
    }catch(e){
        console.error(e);
        return {alive: false, data: null};
    }
};

module.exports = SwitchMachineDetector;