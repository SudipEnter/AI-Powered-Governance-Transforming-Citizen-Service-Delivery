
import React from 'react';
import { Department } from '../types';

interface SidebarProps {
  selectedDepartment: Department;
  onSelectDepartment: (department: Department) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  department: Department;
  label: string;
  // Fix: Changed `JSX.Element` to `React.ReactElement` to resolve namespace error.
  icon: React.ReactElement;
  isSelected: boolean;
  onClick: (department: Department) => void;
}> = ({ department, label, icon, isSelected, onClick }) => (
  <button
    onClick={() => onClick(department)}
    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ${
      isSelected
        ? 'bg-command-highlight text-command-blue font-semibold'
        : 'text-gray-300 hover:bg-command-light-gray/50 hover:text-white'
    }`}
  >
    {React.cloneElement(icon, { className: 'h-5 w-5 mr-3' })}
    <span>{label}</span>
  </button>
);

const icons = {
  [Department.STATE_WIDE]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
  [Department.HEALTH]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
  [Department.INFRASTRUCTURE]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m-3-1l-3-1m-3 1l-3 1m0 0l-3-1.091m0 0l3 1.091m0 0l-3 1.091m0-2.182l3-1.091m13.5-1.636l-3 1.091M21 12.75h-1.5m-12 0h-1.5M12 9.75v1.5m0-1.5V6" /></svg>,
  [Department.PUBLIC_SAFETY]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>,
};


export const Sidebar: React.FC<SidebarProps> = ({ selectedDepartment, onSelectDepartment, isOpen, setIsOpen }) => {
  const navItems = Object.values(Department).map(dept => (
    <NavItem
      key={dept}
      department={dept}
      label={dept}
      icon={icons[dept]}
      isSelected={selectedDepartment === dept}
      onClick={onSelectDepartment}
    />
  ));
  
  const sidebarContent = (
    <div className="p-4">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Departments</h2>
      <nav className="space-y-1">
        {navItems}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-30 transform transition-transform ease-in-out duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setIsOpen(false)}></div>
        <div className="relative h-full w-64 bg-command-gray shadow-xl">
          {sidebarContent}
        </div>
      </div>
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-command-gray border-r border-command-light-gray/50">
          {sidebarContent}
        </div>
      </aside>
    </>
  );
};