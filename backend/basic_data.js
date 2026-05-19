const config = require('./config.json');
const fs = require('fs');
const color = require('colors');
const curnt_time = require('./function_curnt_time');



var reqcount = 0;
async function main(){
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
            var Rnum = 0, Onum = 0;
            const ids = [];
            for(let a = 0; a<= data.d.Result.length-1 ; a++){ // a = repeat
                ids[a] = data.d.Result[a].TrainID;
                if(Number(ids[a])<10) ids[a] = "0" + String(ids[a]);
                String(data.d.Result[a].LineNo) === "O" ? Onum++ : Rnum++;
            };
            console.log(`\n${curnt_time()}  Current refresh rate: ${config.timeouts.main_app/1000} sec.\n`+"Total requests:  " + `${reqcount}`.cyan);
            console.log(`Trains Online:     ${data.d.Result.length} in total`);
            console.log(`Red Line: ${Rnum}/28  WorkLoad: ${(Rnum/28)*100}%`.red + `\nOrange Line: ${Onum}/14 WorkLoad: ${(Onum/14)*100}%`.yellow);
            for(let a = 0; a <= data.d.Result.length-1; a++){
                data.d.Result[a].LineNo === "O" ? 
                console.log(`Train No. ${ids[a]} at `+`${data.d.Result[a].Station}`.yellow)
                :
                console.log(`Train No. ${ids[a]} at `+`${data.d.Result[a].Station}`.red);
                fs.appendFileSync(`${config.src_Folder}/${curnt_time(true)}/id_${ids[a]}.txt`, `+ ${curnt_time()} | ${data.d.Result[a].Station} \n`);
            };
        }catch(e){
            console.error(e);
            return false;
        };
    return true;
}

module.exports = main;