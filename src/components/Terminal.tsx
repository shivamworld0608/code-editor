import React, { useState, useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import io from 'socket.io-client';

const Terminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (terminalRef.current) {
      xtermRef.current = new XTerm();
      const fitAddon = new FitAddon();
      xtermRef.current.loadAddon(fitAddon);
      xtermRef.current.open(terminalRef.current);
      fitAddon.fit();

      const token = localStorage.getItem('token');
      socketRef.current = io('http://localhost:3000', {
        auth: { token }
      });

      xtermRef.current.onData((data) => {
        socketRef.current.emit('terminalCommand', { command: data });
      });

      socketRef.current.on('terminalOutput', (data: { output: string }) => {
        xtermRef.current?.write(data.output);
      });

      return () => {
        xtermRef.current?.dispose();
        socketRef.current.disconnect();
      };
    }
  }, []);

  return <div ref={terminalRef} className="h-64 bg-black" />;
};

export default Terminal;