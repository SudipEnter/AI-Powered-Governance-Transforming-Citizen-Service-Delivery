
import React from 'react';

interface HeaderProps {
  onMenuClick: () => void;
  onExportPDF: () => void;
  isExporting: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, onExportPDF, isExporting }) => {
  return (
    <header className="bg-command-gray/50 backdrop-blur-sm border-b border-command-light-gray/50 sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <svg className="h-8 w-8 text-command-highlight" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-command-text tracking-wider">PROJECT DRISHTI</h1>
              <p className="text-xs text-command-highlight font-mono">MAHARASHTRA GOVERNANCE COMMAND CENTER</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex">
              <button
                onClick={onExportPDF}
                disabled={isExporting}
                className="flex items-center space-x-2 px-3 py-2 bg-command-gray text-command-text text-sm rounded-md hover:bg-command-light-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className={`w-4 h-4 ${isExporting ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  {isExporting ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.18-3.185m-3.18-3.182a8.25 8.25 0 00-11.664 0l-3.18 3.185" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  )}
                </svg>
                <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={onMenuClick}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-command-light-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};