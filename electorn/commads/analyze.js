const { ipcMain } = require('electron');
const AnalyizeTripTime = require('../../backend/AnalyizeTripTime(AnalyzeSpecificID)');

function load_analyze() {
    ipcMain.handle('get-analyzed-data', async (event, id) => {
        return AnalyizeTripTime(id);
    });
}


module.exports = { load_analyze }