import React from 'react';
import { Folder, File, GitBranch } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-100 w-64 p-4 overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <Folder className="mr-2" /> Files
        </h2>
        <ul>
          <li className="flex items-center mb-1">
            <File className="mr-2" size={16} /> index.js
          </li>
          <li className="flex items-center mb-1">
            <File className="mr-2" size={16} /> styles.css
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <GitBranch className="mr-2" /> Branches
        </h2>
        <ul>
          <li className="flex items-center mb-1">
            <GitBranch className="mr-2" size={16} /> main
          </li>
          <li className="flex items-center mb-1">
            <GitBranch className="mr-2" size={16} /> feature/new-ui
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;