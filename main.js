import { app, BrowserWindow, screen } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;

	const mainWindow = new BrowserWindow({
		width: width || 800,
		height: height || 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.cjs'),
			nodeIntegration: true,
			contextIsolation: false,
			webviewTag: true
		}
	});

	mainWindow.loadFile('index.html');
	// mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common for applications and their menu bar to stay active until the user quits, explicitly with Cmd + Q.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});
