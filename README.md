# KRTC-Monitoring

<div align="center">
  <img width="1837" height="448" alt="ac128c29-354d-4887-8" src="https://github.com/user-attachments/assets/d4b1dd12-39f8-4868-97dd-0b12500b6384" />
  <p>
    <strong>A NodeJS-based project that monitors the metro system of the KRTC.</strong>
  </p>
</div>

## 🌟 Overview

KRTC Monitoring is a program dedicated to analyze and to record actions of trains of KRTC(MRT).

## ✨ Features

-  **Where Is the Train** - The main window would show the current location of trains.
-  **Where Was the Train** - The program would fetch data from KRTC Official and save them properly.
-  **SwitchMachineBehavior** - This program would analyze the trains' actions, which in trun indicates the behaviors of switchmachine.
-  **PlayBack** - Thanks to saving data aforementioned, the program is able to playback the trains on the map.
-  **More functions** - We'll keep developing it well!

## 🎯 Quick Start

### Requirements:

- Node.js (v22 Recommanded)
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
│   └── start.bat
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
