# KRTC-Monitoring

<div align="center">
  <img width="1837" height="448" alt="ac128c29-354d-4887-8" src="https://github.com/user-attachments/assets/d4b1dd12-39f8-4868-97dd-0b12500b6384" />
  <p>
    <strong>A NodeJS-based project that monitors the metro system of the KRTC.</strong>
  </p>
</div>

##  Overview

KRTC Monitoring is a program dedicated to analyzing and recording the actions of KRTC (MRT) trains.

[別裝了!說人話!](#簡介)

##  Features

-  **Where Is the Train** - The main window would show the current location of trains.

  <img width="1513" height="939" alt="image" src="https://github.com/user-attachments/assets/447c98f5-5e9e-4061-9336-d3a333152f49" />

  
-  **Where Was the Train** - The program would fetch data from the KRTC Official and save it properly.
-  **SwitchMachineBehavior** - This program would analyze the trains' actions, which in turn indicate the behaviors of the switch machine.

  <img width="1873" height="949" alt="image" src="https://github.com/user-attachments/assets/5bc359e8-77ee-4bf9-a892-89c27abc3892" />


-  **PlayBack** - Thanks to saving data aforementioned, the program is able to playback the trains on the map.

  <img width="1898" height="957" alt="image" src="https://github.com/user-attachments/assets/f4d6fabe-a088-461c-a9cd-9f67e1318783" />


-  **More functions** - We'll keep developing it well!

##  Quick Start

### Requirements:

- Node.js (v22 Recommended)
- npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Herrrrr98/KRTC-Monitoring.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

##  Project Structure

```
├── backend
│   ├── AnalyizeTripTime(AnalyzeSpecificID).js
│   ├── AnalyizeTripTime.js
│   ├── DateFolders_loader.js
│   ├── KRTC-TrData.json
│   ├── SwitchMachineDetector.js
│   ├── function_curnt_time.js
│   ├── getdata.js
│   ├── run.js
│   └── start.bat(for testing)
├── electorn
│   ├── commands
│   │   ├── analyze.js
│   │   ├── getHistoricalData.js
│   │   ├── load_DateFolders.js
│   │   ├── switchmachinebehavior.js
│   │   └── traindata.js
│   ├── main.js
│   └── preload.js
├── src
│   ├── components
│   │   ├── AnalyzedTripTimeCard.jsx
│   │   ├── AnalyzedTripTimeCard.module.css
│   │   ├── HeaderDashBoard.jsx
│   │   ├── HeaderDashBoard.module.css
│   │   ├── KrtcMapSvg.jsx
│   │   ├── LeftContainer.jsx
│   │   ├── LeftContainer.module.css
│   │   ├── LiveCard.jsx
│   │   ├── LiveCard.module.css
│   │   ├── NavTPBtn.jsx
│   │   ├── NavTPBtn.module.css
│   │   ├── ReplayController.jsx
│   │   ├── ReplayController.module.css
│   │   ├── ReplayDashboard.jsx
│   │   ├── RightContainer.jsx
│   │   ├── RightContainer.module.css
│   │   ├── StatBox.jsx
│   │   ├── StatBox.module.css
│   │   ├── SwitchMachineAnalyze.module.css
│   │   ├── SwitchMachineDetectorOverview.jsx
│   │   ├── TrainLiveBox.jsx
│   │   └── TrainLiveBox.module.css
│   ├── images
│   │   ├── icon.png
│   │   ├── mrt_O.png
│   │   ├── mrt_O2.png
│   │   ├── mrt_R.png
│   │   └── mrt_R2.png
│   ├── views
│   │   ├── MainView.jsx
│   │   ├── TripTimeOverview.jsx
│   │   ├── TripTimeOverview.module.css
│   │   └── app.module.css
│   ├── App.jsx
│   ├── main.jsx
│   └── theme.css
├── .gitignore
├── README.md
├── config.json
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

## 🤝 Contributing

I'm just a high schooler from Kaohsiung, Taiwan. Help yourself, sorry.

## 🏆 Contributors

@Hiandy98 ⚡

## Support

- 📧 Email: 140527@student.kshs.kh.edu.tw
---
## 高雄捷運-監看

<div align="center">
  <img width="1837" height="448" alt="ac128c29-354d-4887-8" src="https://github.com/user-attachments/assets/d4b1dd12-39f8-4868-97dd-0b12500b6384" />
  <p>
    <strong>一個基於NodeJS所建的專案去監看高雄捷運的列車</strong>
  </p>
</div>

##  簡介

此專案能夠將高雄捷運列車之資料分析並適當地顯示給使用者

##  功能

-  **列車現在位置** - 主視窗會將列車現在的位置顯示出來。

  <img width="1513" height="939" alt="image" src="https://github.com/user-attachments/assets/447c98f5-5e9e-4061-9336-d3a333152f49" />

-  **列車歷史位置** - 該程式會將列車位置連同時間記錄下來，並加以分析。

  <img width="1873" height="949" alt="image" src="https://github.com/user-attachments/assets/5bc359e8-77ee-4bf9-a892-89c27abc3892" />

-  **轉撤器使用裝況** - 轉撤器位於美麗島-信義國小間，此程式會顯示哪些列車使用過。
-  **回放功能** - 地圖會根據儲存的資料，重現渲染在系統地圖上

  <img width="1898" height="957" alt="image" src="https://github.com/user-attachments/assets/f4d6fabe-a088-461c-a9cd-9f67e1318783" />

-  **更多功能** - 我們還在開發中!

## 🎯 如何開始

### 軟體要求:

- Node.js (建議v22)
- npm
- Git

### 安裝

1. **克隆專案**
   ```bash
   git clone https://github.com/Herrrrr98/KRTC-Monitoring.git
   ```

2. **將依賴模組安裝**
   ```bash
   npm install
   ```

3. **執行**
   ```bash
   npm start
   ```

##  專案結構

```
├── backend
│   ├── AnalyizeTripTime(AnalyzeSpecificID).js
│   ├── AnalyizeTripTime.js
│   ├── DateFolders_loader.js
│   ├── KRTC-TrData.json
│   ├── SwitchMachineDetector.js
│   ├── function_curnt_time.js
│   ├── getdata.js
│   ├── run.js
│   └── start.bat(for testing)
├── electorn
│   ├── commands
│   │   ├── analyze.js
│   │   ├── getHistoricalData.js
│   │   ├── load_DateFolders.js
│   │   ├── switchmachinebehavior.js
│   │   └── traindata.js
│   ├── main.js
│   └── preload.js
├── src
│   ├── components
│   │   ├── AnalyzedTripTimeCard.jsx
│   │   ├── AnalyzedTripTimeCard.module.css
│   │   ├── HeaderDashBoard.jsx
│   │   ├── HeaderDashBoard.module.css
│   │   ├── KrtcMapSvg.jsx
│   │   ├── LeftContainer.jsx
│   │   ├── LeftContainer.module.css
│   │   ├── LiveCard.jsx
│   │   ├── LiveCard.module.css
│   │   ├── NavTPBtn.jsx
│   │   ├── NavTPBtn.module.css
│   │   ├── ReplayController.jsx
│   │   ├── ReplayController.module.css
│   │   ├── ReplayDashboard.jsx
│   │   ├── RightContainer.jsx
│   │   ├── RightContainer.module.css
│   │   ├── StatBox.jsx
│   │   ├── StatBox.module.css
│   │   ├── SwitchMachineAnalyze.module.css
│   │   ├── SwitchMachineDetectorOverview.jsx
│   │   ├── TrainLiveBox.jsx
│   │   └── TrainLiveBox.module.css
│   ├── images
│   │   ├── icon.png
│   │   ├── mrt_O.png
│   │   ├── mrt_O2.png
│   │   ├── mrt_R.png
│   │   └── mrt_R2.png
│   ├── views
│   │   ├── MainView.jsx
│   │   ├── TripTimeOverview.jsx
│   │   ├── TripTimeOverview.module.css
│   │   └── app.module.css
│   ├── App.jsx
│   ├── main.jsx
│   └── theme.css
├── .gitignore
├── README.md
├── config.json
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

## 🏆 貢獻者

@Hiandy98 高雄中學1年8班⚡

## 支援

- 📧 Email: 140527@student.kshs.kh.edu.tw
---
