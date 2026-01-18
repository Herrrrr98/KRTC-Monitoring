const fetch_api = require('node-fetch');
const color = require('colors');
const fs = require('fs');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const config = require('./config.json');
const { constants } = require('fs/promises');

const data_sc = "https://activity.krtc.com.tw/Activity/measygo/map/Map.aspx/showMRTTrain";

function curnt_time(bool){
    const time = new Date();
    var minutes = time.getMinutes();
    if(minutes<10) minutes = "0" + String(minutes);
    if(bool) return `${time.getFullYear()}_${time.getMonth()+1}_${time.getDate()}`;
    else return `${time.getHours()}:${minutes}`;
};

var reqcount = 0;
async function main(){
        const response = await fetch(data_sc , {
            method: 'POST',
            headers: {
                'User-Agent': 'Windos11 x86',
                'Content-Type': 'application/json',
            },
        });
        reqcount++;
        const data = await response.json();
        var Rnum = 0, Onum = 0;
        const ids = [];
        for(var a = 0; a<= data.d.Result.length-1 ; a++){
            if(String(data.d.Result[a].LineNo) === "O") Onum++;
            else Rnum++;
            ids[a] = data.d.Result[a].TrainID;
            if(Number(ids[a])<10) ids[a] = "0" + String(ids[a]);
        };
        console.log(`\n${curnt_time()}\n`+"Total requests:  " + `${reqcount}`.cyan);
        console.log("Trains Online:");
        console.log(`Red Line: ${Rnum}/28  Useage: ${(Rnum/28)*100}%`.red + `\nOrange Line: ${Onum}/14 Useage: ${(Onum/14)*100}%`.yellow);
        for(a = 0; a <= data.d.Result.length-1; a++){
            data.d.Result[a].LineNo === "O" ? 
            console.log(`Train No. ${ids[a]} at `+`${data.d.Result[a].Station}`.yellow) 
            :
            console.log(`Train No. ${ids[a]} at `+`${data.d.Result[a].Station}`.red);
                fs.appendFileSync(`TrData/${curnt_time(true)}/id_${ids[a]}.txt`, `${curnt_time()} | Train No. ${ids[a]} at ${data.d.Result[a].Station} \n`);
        };
};

async function app(){
    var start_app = true;
    if(config.whether_restore_when_starting){ try{
        fs.rmSync('TrData', {recursive: true});
        fs.mkdirSync('TrData');
        console.log("TrData".bgBlue + " is restored.  Please Wait for Starting".green);
        await sleep(10000);
    }catch(e){
        console.log("Found Errors when Restoring".bgRed + `\n${e}`.red);
        start_app = false;
    }};
    try{    
            fs.readdirSync(`TrData/${curnt_time(true)}`);
        }catch(e){
            console.warn(e);
            try {
                fs.mkdirSync(`TrData/${curnt_time(true)}`);
            }catch(err){
                console.log("Found Errors when Creating New Folder".bgRed + `\n${err}`.red);
                start_app = false;
        }};
    while(start_app){
        console.clear();
        main().catch(console.error);
        await sleep(70000);
}};
app().catch(console.error);