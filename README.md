# React Native Chat App

## 📌 Overview
A real-time chat application built using **React Native**, **WebSockets**, and **Redux**. Users can create chat rooms, join rooms, and send messages in real-time.

---

## 🚀 Features
- User Authentication (Username-based)
- Create and Join Chat Rooms
- Real-time Messaging with WebSockets
- Navigation with React Navigation
- State Management with Redux

---

## 📂 Folder Structure
```
.
├── src
│   ├── api
│   │   ├── api.ts
│   │   ├── socket.ts
│   ├── components
│   │   ├── Header.tsx
│   ├── navigation
│   │   ├── AppNavigator.tsx
│   ├── redux
│   │   ├── store.ts
│   │   ├── userSlice.ts
│   ├── screens
│   │   ├── RoomsListScreen.tsx
│   │   ├── CreateRoomScreen.tsx
│   │   ├── ChatSpecificScreen.tsx
│   │   ├── SetUserNameScreen.tsx
│   ├── App.tsx
├── package.json
└── README.md
```

---

## 🛠️ Setup & Installation

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/ddheer29/ChatApp.git
cd ChatApp
```

### 2️⃣ **Install Dependencies**
```sh
npm install
yarn install
```

### 3️⃣ **Run the App**
- **For Android**
  ```sh
  npx react-native run-android
  ```
- **For iOS** (Mac Only, requires Xcode)
  ```sh
  cd ios
  pod install
  cd ..
  npx react-native run-ios
  ```

---
