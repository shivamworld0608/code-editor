import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EditorContextType {
  content: string;
  language: string;
  updateContent: (newContent: string) => void;
  setLanguage: (newLanguage: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState('// Start coding here');
  const [language, setLanguage] = useState('javascript');

  const updateContent = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <EditorContext.Provider value={{ content, language, updateContent, setLanguage }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};