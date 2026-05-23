const { ipcMain } = require('electron');
const app = require('../backend/run');

function load_commands(mainWindow) {
    const startMonitoring = async () => {
        const data_stream = app();
        for await (const report of data_stream) {
            if (mainWindow && !mainWindow.isDestroyed()) {
                const safeReport = JSON.parse(JSON.stringify(report));
                mainWindow.webContents.send('send-krtc-update', safeReport);;
                console.log("send-krtc-update success");
            } else {
                console.log("No Windows...");
            }
        };
    };

    startMonitoring();
}

module.exports = { load_commands };