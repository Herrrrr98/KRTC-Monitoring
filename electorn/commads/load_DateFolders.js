const { ipcMain } = require('electron');
const DateFolders_loader = require('../../backend/DateFolders_loader');

function load_DateFolders() {
    ipcMain.handle('get-DateFolders', async () => {
        return DateFolders_loader();
    });
}

module.exports = { load_DateFolders };