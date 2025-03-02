# React Native Chat App

## 📌 Overview
A real-time chat application built using **React Native**, **WebSockets**, and **Redux**. Users can create chat rooms, join rooms, and send messages in real-time.

---

## 🚀 Features
- User Authentication (Username-based)
- Create and Join Chat Rooms
- Real-time Messaging with WebSockets
- Persistent Message Storage
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
│   │   ├── ChatMessage.tsx
│   ├── navigation
│   │   ├── AppNavigator.tsx
│   ├── redux
│   │   ├── store.ts
│   │   ├── userSlice.ts
│   ├── screens
│   │   ├── RoomsListScreen.tsx
│   │   ├── CreateRoomScreen.tsx
│   │   ├── ChatScreen.tsx
│   ├── App.tsx
├── package.json
└── README.md
```

---

## 🛠️ Setup & Installation

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/yourusername/react-native-chat-app.git
cd react-native-chat-app
```

### 2️⃣ **Install Dependencies**
```sh
yarn install
```

### 3️⃣ **Start the Server (Node.js WebSocket Server Required)**
> Make sure your WebSocket backend is running before starting the app.
```sh
node server.js
```

### 4️⃣ **Run the App**
- **For Android**
  ```sh
  npx react-native run-android
  ```
- **For iOS** (Mac Only, requires Xcode)
  ```sh
  cd ios && pod install && cd ..
  npx react-native run-ios
  ```

---
