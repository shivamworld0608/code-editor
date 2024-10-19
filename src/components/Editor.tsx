import React, { useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useEditor } from '../context/EditorContext';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';

const Editor: React.FC = () => {
  const { content, updateContent, language } = useEditor();
  const { user } = useAuth();
  const editorRef = useRef<any>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    socketRef.current = io('http://localhost:3000', {
      auth: { token }
    });

    socketRef.current.emit('joinRoom', 'mainRoom');

    socketRef.current.on('codeChange', (data: { content: string }) => {
      if (editorRef.current) {
        const currentPosition = editorRef.current.getPosition();
        editorRef.current.setValue(data.content);
        editorRef.current.setPosition(currentPosition);
      }
    });

    socketRef.current.on('cursorMove', (data: { username: string, position: any }) => {
      if (editorRef.current && data.username !== user?.username) {
        // Add a decoration to show other user's cursor
        const decorations = editorRef.current.deltaDecorations([], [
          {
            range: new monaco.Range(
              data.position.lineNumber,
              data.position.column,
              data.position.lineNumber,
              data.position.column + 1
            ),
            options: {
              className: 'other-user-cursor',
              hoverMessage: { value: `${data.username}'s cursor` }
            }
          }
        ]);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [user]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      updateContent(value);
      socketRef.current.emit('codeChange', { roomId: 'mainRoom', content: value });
    }
  };

  const handleCursorChange = (event: any) => {
    const position = event.position;
    socketRef.current.emit('cursorMove', { roomId: 'mainRoom', username: user?.username, position });
  };

  return (
    <div className="flex-1 overflow-hidden">
      <MonacoEditor
        height="100%"
        language={language}
        theme="vs-dark"
        value={content}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          readOnly: user?.role === 'viewer'
        }}
        onCursorPositionChange={handleCursorChange}
      />
    </div>
  );
};

export default Editor;