import {app, Tray, Menu, BrowserWindow, shell} from 'electron';

const persianDate = require('persian-date');
const path = require('path');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`
let tray = null;

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        center: true,
        width: 1000,
        minWidth: 1000,
        minHeight: 563,
        icon: path.join(__dirname, "../../build/icons", "icon.ico"),
        //maxWidth : 1200,
    })

    mainWindow.loadURL(winURL)

    mainWindow.on("close", (e) => {
        e.preventDefault();
        mainWindow.webContents
            .executeJavaScript('localStorage.getItem("settings.active_close_button");', true)
            .then(result => {
                console.log(result);
                if (result == 'true') {
                    app.exit(0);
                } else {
                    mainWindow.hide();
                }
            });
    });

    mainWindow.on("minimize", (e) => {
        mainWindow.webContents
            .executeJavaScript('localStorage.getItem("settings.tray_after_minimize");', true)
            .then(result => {
                if (result == 'true') {
                    mainWindow.hide();
                } else {
                    mainWindow.minimize();
                }
            });
    });

    mainWindow.on('closed', () => {
        mainWindow = null
    });
    trayInit();
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

function trayInit() {
    let persian_date = new persianDate();
    let contextMenu = Menu.buildFromTemplate([
        {
            label: "نمایش مخرن",
            click() {
                shell.openExternal("https://github.com/rezaghz/loutos");
            },
        },
        {
            label: "خروج",
            click() {
                app.quit();
                app.exit();
            }
        },
    ]);
    tray = new Tray(path.join(__static, "icons", "icon.ico"));
    tray.setToolTip("امروز : " + persian_date.format("LLLL"));
    tray.setContextMenu(contextMenu);
    tray.on('click', () => {
        mainWindow.show();
    });
    tray.on('double-click', () => {
        mainWindow.show();
    });
}
