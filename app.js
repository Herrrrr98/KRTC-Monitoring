const color = require('colors');
const fs = require('fs');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const curnt_time = require('./function_curnt_time');
const main = require('./main');
const DataAnalytics = require('./DataAnalytics');
const config = require('./config.json');

async function app(){
    var start_app = true;
    var keep_alive = true;
    var DataAnalytics_Period = config.timeouts.DataAnalytics_Period;
    const Disable_Analytics = DataAnalytics_Period==-1? true : false;
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
                start_app, keep_alive = false;
        }};
        //-------------------------------------------------------------
        if(!Disable_Analytics){
            try{    
            fs.readdirSync(`Analytics`);
            }catch(e){
                console.warn(e);
                try {
                    fs.mkdirSync(`Analytics`);
                    console.log("ERROR has been solved:".bgGreen);
                    console.log(`Analytics`.bgBlue + " is Created.  Please Wait for Starting".green);
                    keep_alive = true;
                    await sleep(config.timeouts.restore_when_starting);
                }catch(err){
                    console.log("Found Errors when Creating New Folder".bgRed + `\n${err}`.red);
                    start_app, keep_alive = false;
                }
            };
            try{    
            fs.readdirSync(`Analytics/${curnt_time(true)}`);
            }catch(e){
                console.warn(e);
                try {
                    fs.mkdirSync(`Analytics/${curnt_time(true)}`);
                    console.log("ERROR has been solved:".bgGreen);
                    console.log(`Analytics/${curnt_time(true)}`.bgBlue + " is Created.  Please Wait for Starting".green);
                    keep_alive = true;
                    await sleep(config.timeouts.restore_when_starting);
                }catch(err){
                    console.log("Found Errors when Creating New Folder".bgRed + `\n${err}`.red);
                    start_app, keep_alive = false;
                }
            };
        };
        //--------------------------------------------------------
        while(keep_alive){
        console.log('\x1B[2J\x1B[3J\x1B[H\x1Bc');
        if(DataAnalytics_Period==0){
            DataAnalytics_Period = config.timeouts.DataAnalytics_Period;
            var Data = await DataAnalytics();
            keep_alive = Data.alive;
            console.log(Data.data);
        };
        keep_alive = await main(Disable_Analytics? "Disabled" : DataAnalytics_Period);
        if(keep_alive) await sleep(config.timeouts.main_app);
        if(!Disable_Analytics) DataAnalytics_Period--;
        }
    }
};
app().catch(console.error);