const { app, BrowserWindow } = require('electron')
const path = require('path')

// 區分生產環境與Dev環境
const isDev = !app.isPackaged;

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (isDev) {
    // 開發環境:讀取 Vite 的 localhost
    win.loadURL('http://localhost:5173');
  } else {
    // 生產環境:讀取 build 出來的 dist/index.html
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

// 掛載
app.whenReady().then(() => {
    createWindow();
    // 給macOS用的...
    app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 關閉, 給windows/linux用的 macOS好像不用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

