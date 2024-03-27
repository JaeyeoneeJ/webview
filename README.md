# webview

## 0. 개요

- 이 프로젝트에서 궁극적으로 목표하는 바는 다음과 같습니다.
  - 카메라 모듈을 이용하여 QR Code를 읽고 결과를 반환
  - 브라우저를 실행한 환경을 감지하고 환경이 모바일 디바이스인 경우, 모바일 뒷면의 카메라를 사용하도록 함
- 이 프로젝트는 일반 PC 환경과 Android 환경에서 실행됩니다.
  - 만일 Android 환경에서 테스트하고자 하는 경우, 아래 링크를 참조하여 주십시오.
  - [https://github.com/JaeyeoneeJ/webview-android](https://github.com/JaeyeoneeJ/webview-android)

## 1. 개발 환경

- 이 프로젝트는 다음과 같은 환경에서 개발되었습니다.

```
- npm: 10.2.4
- node: v20.11.0
- dependencies
  - "@reduxjs/toolkit": "^2.2.2",
  - "react": "^18.2.0",
  - "react-dom": "^18.2.0",
  - "react-qr-reader": "^3.0.0-beta-1",
  - "react-redux": "^9.1.0",
  - "react-router-dom": "^6.22.3",
  - "react-scripts": "5.0.1",
  - "react-spinners": "^0.13.8",
  - "styled-components": "^6.1.8"
- devDependencies
  - "cross-env": "^7.0.3"
```

- 이 프로젝트의 구조는 다음과 같습니다.

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.js
    ├── App.test.js
    ├── components
    │   ├── QRScanner.jsx
    │   └── svg
    │       └── BackArrow.jsx
    ├── features
    │   └── scan
    │       └── scanSlice.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── routes
    │   ├── Home.jsx
    │   └── Scan.jsx
    ├── setupTests.js
    └── store
        └── store.js
```

## 2. 프로젝트 실행

### 1) `npm start` || `npm run start`

- 위 명령어를 통해 개발 모드의 앱을 실행할 수 있으며, [http://localhost:3000](http://localhost:3000)의 기본 포트의 브라우저에서 확인할 수 있습니다.
- 개발 모드 설정 및 OS 호환을 위해 `cross-env` 라이브러리를 사용하였습니다.

### 2) `npm run start_p`

- 위 명령어를 통해 production 환경에서 앱을 실행할 수 있습니다.

### 3) `npm run build`

- 위 명령어를 통해 production 환경으로 앱을 빌드할 수 있습니다.
- 만일 당신의 글로벌 환경에 http-server가 설치되어 있는 경우, 빌드 후, `npx http-server ./build`로 빌드된 앱을 확인할 수 있습니다.

## 3. 프로젝트 확인

### 1) 일반

- App이 로드된 후, 버튼을 눌러 QR Scan을 진행할 수 있습니다.
- Scan 라우터 접근 후, 2000ms 동안 카메라 모듈이 동작하지 않으면 에러 팝업을 반환하고 이전 페이지로 돌아갑니다.
- 카메라가 정상적으로 로드되면, App에 카메라 화면이 VIDEO_CAPTURE 형태로 제공되며, 1000ms 마다 QR Code를 스캔합니다.
- QR Code가 스캔되면 이전 페이지로 돌아간 후, 결과값을 반환합니다.
- `src/components/QRScanner.jsx` 파일 수정을 통해 원하는 딜레이 시간 등을 조정할 수 있습니다.

### 2) 특이사항

- 모바일 디바이스로 접근 시, VIDEO_CAPTURE의 기본 동작은 전면 카메라를 우선적으로 사용하므로,
  후면 카메라를 사용하기 위해 카메라 모듈을 필터링하는 기능이 추가되었습니다.
- 만일 전면 카메라를 사용하고자 한다면, `envMode.includeLabel`을 `front`로 바꿔보시기 바랍니다.
