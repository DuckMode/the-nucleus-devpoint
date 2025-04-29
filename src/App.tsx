import { useState } from 'react';
import { Console } from './components/Console';
import './components/Console.css';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="h-14 bg-gray-800 flex items-center px-4 justify-between">
        <div className="text-lg font-bold">THE NUCLEUS</div>
        <input
          type="text"
          placeholder="Ask Nucleus..."
          className="px-3 py-1 w-72 rounded bg-gray-700 text-white border border-gray-600"
        />
        <div className="flex gap-4">
          <span>🔔</span>
          <span>👤</span>
          <span>⚙️</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-56px)]">
        {/* Left Sidebar */}
        <div id="sidebarLeft" className="w-56 bg-gray-800 p-4">
          <h3 className="text-sm font-bold mb-4">DEVICES</h3>
          <ul className="space-y-2">
            <li>MindMap</li>
            <li>Through The Wire Frame</li>
            <li>UX FLOW</li>
            <li>Color Scheme Sum</li>
            <li>PROTOTYPER</li>
            <li>TECH STACKER</li>
          </ul>
        </div>

        {/* Whiteboard Area */}
        <div className="flex-1 bg-white text-black p-5 relative overflow-auto">
          <div className="absolute top-5 left-5 bg-gray-100 p-4 rounded shadow">
            💡 Drag me anywhere!
          </div>
        </div>

        {/* Right Sidebar */}
        <div id="sidebarRight" className="w-56 bg-gray-800 p-4">
          <h3 className="text-sm font-bold mb-4">DEVICES</h3>
          <ul className="space-y-2">
            <li>House Exterior</li>
            <li>Entrance Camera (Active)</li>
            <li>Stairs Camera (Deactivated at 22:47)</li>
            <li>Cams</li>
            <li>Paracops (Deactivated at 21:00)</li>
            <li>Router</li>
            <li>Air Conditioning</li>
            <li>Garden Lights (Active)</li>
          </ul>
        </div>
      </div>

      {/* Console Component */}
      <Console />
    </div>
  );
}

export default App;
