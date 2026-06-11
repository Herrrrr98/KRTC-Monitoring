//This command was partly created by Gemini.
const fs = require('fs');
const path = require('path');
const { ipcMain } = require('electron');
const config = require('../../config.json');


function load_getHistoricData(){
    ipcMain.handle('get-historical-data', async (event, dateString) => {
    const folderPath = path.resolve(process.cwd(), "backend", config.src_Folder, dateString);
    console.log("Checking folder path:", folderPath);
    if (!fs.existsSync(folderPath)) {
        return [];
    }
    const files = fs.readdirSync(folderPath);
    let parsedData = [];
    for (const file of files) {
        if (file.startsWith('id_') && file.endsWith('.txt')) {
            const trainId = file.replace('id_', '').replace('.txt', '');
            const content = fs.readFileSync(path.join(folderPath, file), 'utf-8');
            const lines = content.split('\n').filter(line => line.trim() !== '');
            let timeline = [];
            for (const line of lines) {
                const parts = line.split('|');
                if (parts.length >= 2) {
                    let timeStr = parts[0].replace('+', '').trim();
                    const station = parts[1].trim();
                    if (timeStr.split(':').length === 2) {
                        timeStr += ':00';
                    }
                    timeline.push({ time: timeStr, station: station });
                }
            }
            parsedData.push({ TrainID: trainId, timeline: timeline });
        }
    }
    return parsedData;
});
};

module.exports = { load_getHistoricData };