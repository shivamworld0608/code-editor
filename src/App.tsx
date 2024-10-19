import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Chat from './components/Chat';
import Terminal from './components/Terminal';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import { EditorProvider } from './context/EditorContext';

function App() {
  return (
    <AuthProvider>
      <EditorProvider>
        <Router>
          <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <Routes>
                <Route path="/" element={
                  <div className="flex flex-col flex-1">
                    <Editor />
                    <Terminal />
                  </div>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
              <Chat />
            </div>
          </div>
        </Router>
      </EditorProvider>
    </AuthProvider>
  );
}

export default App;