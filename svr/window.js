const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');

if (app) {
  app.disableHardwareAcceleration();

  ipcMain.on('read-folder', (event, folderPath) => {
    try {
      const files = fs.readdirSync('../site/' + folderPath);
      event.sender.send('read-folder-response', { success: true, files });
    } catch (error) {
      event.sender.send('read-folder-response', { success: false, error: error.message });
    }
  });
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}

let main;

function createWindow() {
  main = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    autoHideMenuBar: true,
    backgroundColor: '#222222',
    title: 'goober real no way?',
    icon: '../site/goober.ico',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  main.loadFile('../site/index.html');
  main.on('closed', () => (main = null));
}

module.exports = { app, main, createWindow };