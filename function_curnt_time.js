function curnt_time(bool){
    const time = new Date();
    var minutes = time.getMinutes();
    if(minutes<10) minutes = "0" + String(minutes);
    if(bool) return `${time.getFullYear()}_${time.getMonth()+1}_${time.getDate()}`;
    else return `${time.getHours()}:${minutes}`;
}

module.exports = curnt_time