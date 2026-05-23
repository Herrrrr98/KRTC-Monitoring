const config = require('../config.json');
const fs = require('fs');
const path = require('path');
const curnt_time = require('./function_curnt_time');



async function getdata(reqcount){
    try{
        const response = await fetch(config.Requesting_Target_URL , {
            method: 'POST',
            headers: {
                'User-Agent': config['Fetch-API_User-Agent_Alias'],
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        reqcount++;
        var Rnum = 0, Onum = 0, trains = [];
        for(let a = 0; a < data.d.Result.length; a++){
            trains.push({
                "TrainID": String(data.d.Result[a].TrainID).padStart(2,"0"),
                "Line": data.d.Result[a].LineNo,
                "WhereItWas": data.d.Result[a].Station
            });
            String(data.d.Result[a].LineNo) === "O" ? Onum++ : Rnum++;
            const file_Absolute_Path = path.resolve(
                __dirname,
                config.src_Folder,
                curnt_time(true),
                `id_${trains[a].TrainID}.txt`
            );

            fs.appendFileSync(file_Absolute_Path, `+ ${curnt_time()} | ${trains[a].WhereItWas} \n`);
        };
    }catch(e){
        console.error(e);
        return { alive: false, data: null};
    };
    return {alive: true, data: {Trains: trains, R: Rnum, O: Onum, req_count: reqcount}};
}

module.exports = getdata;