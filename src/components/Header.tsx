import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Code, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Code className="mr-2" />
        <h1 className="text-xl font-bold">Collaborative Code Editor</h1>
      </div>
      {user ? (
        <div className="flex items-center">
          <User className="mr-2" />
          <span className="mr-4">{user.username}</span>
          <button onClick={logout} className="flex items-center">
            <LogOut className="mr-1" />
            Logout
          </button>
        </div>
      ) : (
        <div>Please log in</div>
      )}
    </header>
  );
};

export default Header;