const { ipcMain } = require('electron');
const AnalyzeTripTimeSpecific = require('../../backend/AnalyizeTripTime(AnalyzeSpecificID)');

function load_analyze() {
    ipcMain.handle('get-analyzed-data', async (event, data) => {
        return AnalyzeTripTimeSpecific(data);
    });
}


module.exports = { load_analyze }