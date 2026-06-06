const { ipcMain } = require('electron');
const  SwitchMachineDetector  = require('../../backend/SwitchMachineDetector');

function load_SwitchMachineBehavior() {
    ipcMain.handle('get-switchmachine-behavior', async () => {
        return SwitchMachineDetector();
    });
}

module.exports = { load_SwitchMachineBehavior };