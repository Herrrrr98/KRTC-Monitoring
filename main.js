const color = require('colors');
const fs = require('fs');
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const config = require('./config.json');


function curnt_time(bool){
    const time = new Date();
    var minutes = time.getMinutes();
    if(minutes<10) minutes = "0" + String(minutes);
    if(bool) return `${time.getFullYear()}_${time.getMonth()+1}_${time.getDate()}`;
    else return `${time.getHours()}:${minutes}`;
};

function timeToMin(timearr){
    return timearr.split(":")[0] * 60 + timearr.split(":")[1];
};

var reqcount = 0;
async function main(periodcallback){
        const response = await fetch(config.Requesting_Target_URL , {
            method: 'POST',
            headers: {
                'User-Agent': config['Fetch-API_User-Agent_Alias'],
                'Content-Type': 'application/json',
            },
        });
        reqcount++;
        const data = await response.json();
        var Rnum = 0, Onum = 0;
        const ids = [];
        for(let a = 0; a<= data.d.Result.length-1 ; a++){ // a = repeat
            ids[a] = data.d.Result[a].TrainID;
            if(Number(ids[a])<10) ids[a] = "0" + String(ids[a]);
            String(data.d.Result[a].LineNo) === "O" ? Onum++ : Rnum++;
        };
        console.log(`\n${curnt_time()}  Current refresh rate: ${config.timeouts.main_app/1000} sec.\n`+"Total requests:  " + `${reqcount}`.cyan);
        console.log(`Current Analytics Period: ${periodcallback}`)
        console.log(`Trains Online:     ${data.d.Result.length} in total`);
        console.log(`Red Line: ${Rnum}/28  WorkLoad: ${(Rnum/28)*100}%`.red + `\nOrange Line: ${Onum}/14 WorkLoad: ${(Onum/14)*100}%`.yellow);
        for(let a = 0; a <= data.d.Result.length-1; a++){
            data.d.Result[a].LineNo === "O" ? 
            console.log(`Train No. ${ids[a]} at `+`${data.d.Result[a].Station}`.yellow)
            :
            console.log(`Train No. ${ids[a]} at `+`${data.d.Result[a].Station}`.red);
            try {
                fs.appendFileSync(`${config.src_Folder}/${curnt_time(true)}/id_${ids[a]}.txt`, `+ ${curnt_time()} | ${data.d.Result[a].Station} \n`)
            }catch(e){
                return false;
            }
        };
    return true;
};

async function DataAnalytics() {
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
                contents.splice(0,1); //(contents[0] is empty, causing train&time would lose an data.)
                var train = [], time = [];
                for(let analytics_foreach = 0; analytics_foreach < contents.length; analytics_foreach++){
                    train.push(contents[analytics_foreach].split(" | ")[1]);
                    time.push(contents[analytics_foreach].split(" | ")[0]);
                };
                console.log(`[[ ${folders[repeat].name + '/' + fileName} ]] \n ${contents} \n${train} \n\n${time}`);
            }
        }
    }catch(e){
        console.error(e);
        return false;
    }
    return true;
};

async function app(){
    var start_app = true;
    var keep_alive = true;
    var DataAnalytics_Period = config.timeouts.DataAnalytics_Period;
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
        while(keep_alive){
        console.log('\x1B[2J\x1B[3J\x1B[H\x1Bc');
        if(DataAnalytics_Period==0){
            DataAnalytics_Period = config.timeouts.DataAnalytics_Period;
            keep_alive = await DataAnalytics();
        };
        keep_alive = await main(DataAnalytics_Period);
        if(keep_alive) await sleep(config.timeouts.main_app);
        DataAnalytics_Period--;
        }
    }
};
app().catch(console.error);