import {app, Tray, Menu, BrowserWindow, shell, nativeImage} from 'electron';

const persianDate = require('persian-date');
const path = require('path');
const AutoLaunch = require('auto-launch');

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
    setAutoLunch();
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
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
    let today = "امروز : " + persian_date.format("LLLL");
    if (process.platform === "linux") {
        const trayIcon = path.join(__static, "icons", "icon.png");
        const nimage = nativeImage.createFromPath(trayIcon);
        let contextMenu = Menu.buildFromTemplate([
            {
                label: today,
                click() {
                    mainWindow.show();
                },
            },
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
        tray = new Tray(nimage);
        tray.setContextMenu(contextMenu);
    } else {
        const trayIcon = path.join(__static, "icons", "icon.ico");
        const nimage = nativeImage.createFromPath(trayIcon);
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
        tray = new Tray(nimage);
        tray.setContextMenu(contextMenu);
        tray.setToolTip(today);
    }
    tray.on('click', () => {
        mainWindow.show();
    });
    tray.on('double-click', () => {
        mainWindow.show();
    });
}

function setAutoLunch() {
    mainWindow.webContents
        .executeJavaScript('localStorage.getItem("settings.run_startup");', true)
        .then(result => {
            let autoLauncher = new AutoLaunch({
                name: "Loutos"
            });
            if (result == null || result == 'true') {
                autoLauncher.enable();
            } else {
                autoLauncher.disable();
            }
        });
}