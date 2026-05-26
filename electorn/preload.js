const { contextBridge, ipcRenderer } = require('electron');

// 註冊一下方法
contextBridge.exposeInMainWorld('api', {
	onKrtcUpdate: (callback) => {
    	const subscription = (event, data) => callback(data);
		ipcRenderer.on('send-krtc-update', subscription);
		return () => ipcRenderer.removeListener('send-krtc-update', subscription);
  	},
	startMonitor: () => {
		ipcRenderer.send('ready-to-monitor');
	},
	getLatestData: () => ipcRenderer.invoke('get-latest-krtc-data'),
	getAnalyzedData: (...args) => ipcRenderer.invoke('get-analyzed-data')
});