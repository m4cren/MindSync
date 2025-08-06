import { app, BrowserWindow } from "electron";

const createWindow = () => {
   const win = new BrowserWindow({
      width: 1920,
      height: 1080,
   });
   win.setMenu(null);
   win.loadURL("http://localhost:3000"); // or local build file
};

app.whenReady().then(createWindow);
