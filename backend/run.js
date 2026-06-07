const fs = require('fs');
const path = require('path');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const curnt_time = require('./function_curnt_time');
const getdata = require('./getdata');
const AnalyizeTripTIme = require('./AnalyizeTripTime');
const config = require('../config.json');


var reqcount = 0;
async function* app(){
    const base_path = path.resolve(__dirname, config.src_Folder);
    var start_app = true;
    var keep_alive = true;
    if(config.whether_restore_when_starting){ 
        try{
            fs.rmSync(base_path, {recursive: true});
            fs.mkdirSync(base_path);
            console.log(base_path + " is restored.  Please Wait for Starting");
            await sleep(config.timeouts.restore_when_starting);
    }catch(e){
        console.log(`Found Errors when Restoring \n${e}`);
        start_app = false;
    }};
    while(start_app){
        const LoopDate = curnt_time(true);
        const dailyFolder = path.join(base_path, curnt_time(true));
        try{
            fs.readdirSync(dailyFolder);
        }catch(e){
            console.warn(e);
            try {
                fs.mkdirSync(dailyFolder, { recursive: true });
                console.log("ERROR has been solved:");
                console.log(`${dailyFolder} is Created. Please Wait for Starting`);
                keep_alive = true;
                await sleep(config.timeouts.restore_when_starting);
            }catch(err){
                console.log(`Found Errors when Creating New Folder \n${err}`);
                start_app = false;
                keep_alive = false;
        }};
        //--------------------------------------------------------
        var is_first_run = true;
        keep_alive = true;
        while(keep_alive){
            if(curnt_time(true) !== LoopDate){
                console.log(`[Time] Midnight detected. Initializing Preparation...`)
                keep_alive = false;
                break;
            };

            if (!is_first_run) {
                if(keep_alive) await sleep(config.timeouts.main_app);
            } else {
                is_first_run = false;
            };

            var d = await getdata(reqcount);
            if(d.alive){
                reqcount = d.data.req_count;
            }else{
                console.error(`[API Target Error] Returned unexpected data at ${curnt_time()}. Content: `, d.data);
                continue;
            };

            console.log(
                `Testing:\n`+
                `last_refresh: ${curnt_time()}\n` +
                `refresh_rate: ${config.timeouts.main_app / 1000}\n` +
                `Rnum: ${d.data.R}\n`+
                `Onum: ${d.data.O}\n`+
                `Reqcount: ${d.data.req_count}\n`
            );
            console.log(d.data.Trains);

            yield {
                reqcount: reqcount,
                rNum: d.data.R,
                oNum: d.data.O,
                trains: d.data.Trains,
                refresh_rate: config.timeouts.main_app,
                lest_refresh: curnt_time()
            };
        }
    }
};


// testing
// async function startRunner() {
//     const dataStream = app(); 
    
//     for await (const report of dataStream) {
//         console.log('\x1B[2J\x1B[3J\x1B[H\x1Bc');
        
//         console.log(report.lest_refresh);
//         console.log(report.refresh_rate);
//         console.log(report.rNum);
//         console.log(report.oNum);
//         console.log(report.reqcount);
        
//         if (!report.isResting) {
//             console.log(report.analyizedData);
//         } else {
//             console.log("Resting");
//         }
        
//         console.log(report.trains);
//     }
// }

// startRunner().catch(console.error);

module.exports = app;