const { ipcMain } = require('electron');

function load_analyze() {
    ipcMain.handle('get-analyzed-data', async () => {
        // command
    });
}

module.exports = { load_analyze }