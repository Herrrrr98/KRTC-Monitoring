const fs = require('fs');
const path = require('path');
const { ipcMain } = require('electron');
const config = require('../../config.json'); // Adjust path to your config


function load_getHistoricData(){
    ipcMain.handle('get-historical-data', async (event, dateString) => {
    // Navigate to the folder for the requested date (e.g., "2026_6_6")
    const folderPath = path.resolve(process.cwd(), "backend", config.src_Folder, dateString);
    console.log("Checking folder path:", folderPath);
    
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
                // Now parses your new format: "+ 15:12 | R3_u"
                const parts = line.split('|');
                if (parts.length >= 2) {
                    let timeStr = parts[0].replace('+', '').trim(); // "15:12"
                    const station = parts[1].trim(); // "R3_u"
                    
                    // ✨ THE TWEAK: Add seconds if they are missing so the React clock syncs perfectly!
                    if (timeStr.split(':').length === 2) {
                        timeStr += ':00'; // Turns "15:12" into "15:12:00"
                    }

                    timeline.push({ time: timeStr, station: station });
                }
            }
            // Passing it as 'timeline' works perfectly because our React dashboard 
            // checks for both (train.logs || train.timeline)
            parsedData.push({ TrainID: trainId, timeline: timeline });
        }
    }
    return parsedData;
});
};

module.exports = { load_getHistoricData };