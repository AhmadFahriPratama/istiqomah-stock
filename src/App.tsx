import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, ScanLine, Box, Settings } from 'lucide-react';
import DashboardScreen from './screens/DashboardScreen';
import FloorScreen from './screens/FloorScreen';
import ScannerScreen from './screens/ScannerScreen';
import SettingsScreen from './screens/SettingsScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen bg-gray-50 overflow-hidden w-full max-w-md mx-auto sm:shadow-2xl relative">
        <div className="flex-1 overflow-y-auto pb-20">
          <Routes>
            <Route path="/" element={<DashboardScreen />} />
            <Route path="/floor" element={<FloorScreen />} />
            <Route path="/scan" element={<ScannerScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </div>
        
        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
          <NavItem to="/" icon={<LayoutDashboard size={24} />} label="Dashboard" />
          <NavItem to="/floor" icon={<Box size={24} />} label="Floor" />
          <div className="-mt-8">
            <NavLink to="/scan" className={({ isActive }) => 
              `flex items-center justify-center w-14 h-14 rounded-full shadow-lg text-white transition-transform ${isActive ? 'bg-primary-600 scale-110' : 'bg-primary-500 hover:bg-primary-600'}`
            }>
              <ScanLine size={28} />
            </NavLink>
          </div>
          <NavItem to="/settings" icon={<Settings size={24} />} label="Settings" />
        </nav>
      </div>
    </BrowserRouter>
  );
}

function NavItem({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <NavLink to={to} className={({ isActive }) => 
      `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'}`
    }>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
  );
}

export default App;
