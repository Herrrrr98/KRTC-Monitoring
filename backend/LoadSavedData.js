const fs = require('fs');
const curnt_time = require('./function_curnt_time');
const config = require('../config.json');
const TrainClass = require('./KRTC-TrData.json');
const AnalyizeTripTime = require('./Analyize_TripTime');

function timeToMin(timearr){
    return Number(timearr.split(":")[0] * 60) + Number(timearr.split(":")[1]);
};

async function LoadSavedData() {
    try{
        var folders = fs.readdirSync(config.src_Folder, { withFileTypes: true }).filter(counts => counts.isDirectory());
        for(let repeat = 0; repeat < folders.length; repeat++){
            var folderPath = config.src_Folder + '/' + folders[repeat].name;
            var files = fs.readdirSync(folderPath);
            var filescount = files.length;
            for(let inner_repeat = 0; inner_repeat < filescount; inner_repeat++){
                var fileName = files[inner_repeat];
                var file = fs.readFileSync(folderPath + '/'+ fileName, 'utf-8');
                var contents = file.split("+");
                contents.splice(0,1); //(contents[0] is empty, making train&time would lose a data.)
                var train = [], time = [];
                for(let analytics_foreach = 0; analytics_foreach < contents.length; analytics_foreach++){
                    train.push(contents[analytics_foreach].split(" | ")[1].trim());
                    time.push(contents[analytics_foreach].split(" | ")[0].trim());
                };
                var CurrentAnalyizedData = await AnalyizeTripTime(train,time);
                
            }
        }
        return {alive: true, data: {WhereItWas: train, Time: time}};
    }catch(e){
        console.error(e);
        return {alive: false, data: null};
    }
};

module.exports = LoadSavedData;