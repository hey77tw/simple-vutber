const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// 保持對窗口對象的全局引用，如果不這麼做的話，當JavaScript對象被垃圾回收的時候，窗口會自動關閉
let mainWindow;

function createWindow() {
  // 創建瀏覽器窗口
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      // 允許媒體設備存取
      allowRunningInsecureContent: false,
      experimentalFeatures: true,
      // 防止應用程式在背景時暫停
      backgroundThrottling: false
    },
    icon: path.join(__dirname, 'assets/vtuber-mouth-close.png'),
    title: 'VTuber音訊視覺化',
    show: false, // 先不顯示，等載入完成後再顯示
    backgroundColor: '#2c3e50', // 設定背景色，與應用主題一致
    // 設定應用程式優先級
    alwaysOnTop: false,
    focusable: true,
    // 防止應用程式在失去焦點時最小化或暫停
    skipTaskbar: false,
    minimizable: true
  });

  // 載入應用的index.html
  mainWindow.loadFile('index.html');

  // 當窗口準備好顯示時顯示
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // 設定媒體權限
    mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
      if (permission === 'media') {
        // 自動允許媒體權限
        callback(true);
      } else {
        callback(false);
      }
    });
    
    // 如果是開發模式，可以打開開發者工具
    // mainWindow.webContents.openDevTools();
  });

  // 當窗口關閉時觸發
  mainWindow.on('closed', () => {
    // 取消引用window對象，如果你的應用支持多窗口的話，通常會把多個window對象存放在一個數組裡，
    // 與此同時，你應該刪除相應的元素
    mainWindow = null;
  });

  // 防止窗口在失去焦點時暫停
  mainWindow.on('blur', () => {
    // 窗口失去焦點時不做任何暫停操作
    console.log('窗口失去焦點，但繼續運行');
  });

  mainWindow.on('focus', () => {
    // 窗口重新獲得焦點
    console.log('窗口重新獲得焦點');
  });

  // 防止應用程式在最小化時暫停
  mainWindow.on('minimize', () => {
    console.log('窗口最小化，但繼續運行');
  });

  mainWindow.on('restore', () => {
    console.log('窗口還原');
  });

  // 處理外部鏈接
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    require('electron').shell.openExternal(url);
    return { action: 'deny' };
  });
}

// Electron會在初始化完成並且準備好創建瀏覽器窗口時調用這個方法
// 部分API在ready事件觸發後才能使用
app.whenReady().then(() => {
  // 防止應用程式進入睡眠模式
  app.commandLine.appendSwitch('disable-background-timer-throttling');
  app.commandLine.appendSwitch('disable-renderer-backgrounding');
  app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');
  
  createWindow();
});

// 當全部窗口關閉時退出
app.on('window-all-closed', () => {
  // 在macOS上，除非用戶用Cmd + Q確定地退出，否則絕大部分應用及其選單欄會保持啟用
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在macOS上，當點擊dock中的應用圖標並且還沒有其它窗口打開的時候，重新創建一個窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 設定應用選單
const template = [
  {
    label: '檔案',
    submenu: [
      {
        label: '重新載入',
        accelerator: 'CmdOrCtrl+R',
        click: () => {
          if (mainWindow) {
            mainWindow.reload();
          }
        }
      },
      {
        label: '開發者工具',
        accelerator: 'F12',
        click: () => {
          if (mainWindow) {
            mainWindow.webContents.toggleDevTools();
          }
        }
      },
      { type: 'separator' },
      {
        label: '退出',
        accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
        click: () => {
          app.quit();
        }
      }
    ]
  },
  {
    label: '視窗',
    submenu: [
      {
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: '關閉',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }
    ]
  },
  {
    label: '說明',
    submenu: [
      {
        label: '關於VTuber音訊視覺化',
        click: () => {
          require('electron').dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: '關於',
            message: 'VTuber音訊視覺化 v1.0.0',
            detail: '一個即時音訊視覺化應用，讓VTuber根據您的聲音張嘴說話！'
          });
        }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
