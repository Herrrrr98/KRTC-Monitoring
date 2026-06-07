const fs = require('fs');
const path = require('path');
const { ipcMain } = require('electron');
const config = require('../../config.json'); // Adjust path to your config


function load_getHistoricData(){
    ipcMain.handle('get-historical-data', async (event, dateString) => {
    // Navigate to the folder for the requested date (e.g., "2026_6_6")
    const folderPath = path.resolve(process.cwd(), "backend" ,config.src_Folder, dateString);
    console.log(folderPath);
    
    if (!fs.existsSync(folderPath)) {
        return []; // Return empty if the folder doesn't exist
    }

    const files = fs.readdirSync(folderPath);
    let parsedData = [];

    for (const file of files) {
        if (file.startsWith('id_') && file.endsWith('.txt')) {
            const trainId = file.replace('id_', '').replace('.txt', ''); // Extracts "12"
            const content = fs.readFileSync(path.join(folderPath, file), 'utf-8');
            const lines = content.split('\n').filter(line => line.trim() !== '');

            let timeline = [];
            for (const line of lines) {
                // Your current format is: "+ 12:30:45 | R16"
                const parts = line.split('|');
                if (parts.length === 2) {
                    const timeStr = parts[0].replace('+', '').trim(); // "12:30:45"
                    const station = parts[1].trim(); // "R16"
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