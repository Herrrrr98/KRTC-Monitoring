const fs = require('fs');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const curnt_time = require('./function_curnt_time');
const getdata = require('./getdata');
const AnalyizeTripTIme = require('./AnalyizeTripTime');
const config = require('../config.json');


var reqcount = 0;
async function app(){
    var start_app = true;
    var keep_alive = true;
    if(config.whether_restore_when_starting){ 
        try{
            fs.rmSync(`${config.src_Folder}`, {recursive: true});
            fs.mkdirSync(`${config.src_Folder}`);
            console.log(`${config.src_Folder}`.bgBlue + " is restored.  Please Wait for Starting".green);
            await sleep(config.timeouts.restore_when_starting);
    }catch(e){
        console.log("Found Errors when Restoring".bgRed + `\n${e}`.red);
        start_app = false;
    }};
    while(start_app){
        try{
            fs.readdirSync(`${config.src_Folder}/${curnt_time(true)}`);
        }catch(e){
            console.warn(e);
            try {
                fs.mkdirSync(`${config.src_Folder}/${curnt_time(true)}`);
                console.log("ERROR has been solved:".bgGreen);
                console.log(`${config.src_Folder}/${curnt_time(true)}`.bgBlue + " is Created.  Please Wait for Starting".green);
                keep_alive = true;
                await sleep(config.timeouts.restore_when_starting);
            }catch(err){
                console.log("Found Errors when Creating New Folder".bgRed + `\n${err}`.red);
                start_app = false;
                keep_alive = false;
        }};
        //--------------------------------------------------------
        while(keep_alive){
        console.log('\x1B[2J\x1B[3J\x1B[H\x1Bc');
        var d = await getdata(reqcount);
        if(d.alive){
            reqcount = d.data.req_count;
        }else{
            keep_alive = false;
            continue;
        };
        var Data_Analyized = await AnalyizeTripTIme();
        if(!Data_Analyized.alive){
            keep_alive = false;
            continue;
        };
        console.log(
            `Testing:\n`+
            `Rnum: ${d.data.R}\n`+
            `Onum: ${d.data.O}\n`+
            `Reqcount: ${d.data.req_count}\n`+
            `Analyized Data:\n`+
            (reqcount%4==0? Data_Analyized.data : "Resting")
        );
        console.log(d.data.Trains);
        if(keep_alive) await sleep(config.timeouts.main_app);
        }
    }
};
app().catch(console.error);