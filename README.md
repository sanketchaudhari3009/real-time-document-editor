# Realtime Document Collaboration
Realtime document sharing and editing web application for personal usage

## Demo
(![realtime-doc](https://user-images.githubusercontent.com/78204805/189190724-e2eb00c9-36a7-44d5-b371-95c389274794.gif))

## Features
- Generates link to start document
- Multiple users having link can edit the file
- Document is saved every 2s, ensuring persistent data across the link

## Installation
```bash
git clone https://github.com/sanketchaudhari3009/real-time-document-editor.git
cd realtime-document-collaboration
npm install

# Run server
cd server
npm run devStart

# Start react app
cd ../client
npm start
```

Now the application will be running on `http://localhost:3000/`

## Packages
- Node.js
- React
- Socket.io
- Quill
