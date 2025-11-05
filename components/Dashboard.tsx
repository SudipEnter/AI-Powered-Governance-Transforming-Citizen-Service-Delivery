
import React from 'react';
import { Department, BriefingIssue, ActionStatus } from '../types';
import { BriefingCard } from './BriefingCard';
import { Spinner } from './Spinner';

interface DashboardProps {
  department: Department;
  briefing: BriefingIssue[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
  onActionStatusChange: (issueId: string, actionId: number, status: ActionStatus) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ department, briefing, isLoading, error, onRefresh, onActionStatusChange }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full py-24">
          <Spinner />
          <p className="mt-4 text-command-text font-mono text-sm">Synthesizing intelligence from Oracle agents...</p>
          <p className="text-gray-400 font-mono text-xs">Querying Gemini Pro...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full py-24 text-center">
          <svg className="w-16 h-16 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="mt-4 text-red-400 font-semibold">{error}</p>
          <button
            onClick={onRefresh}
            className="mt-4 px-4 py-2 bg-command-highlight/20 text-command-highlight rounded-md hover:bg-command-highlight/30 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      );
    }

    if (briefing.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full py-24 text-center">
          <svg className="w-16 h-16 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-gray-400 font-medium">All Clear</p>
          <p className="text-gray-500 text-sm">No critical issues detected for this department.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {briefing.map((issue) => (
          <BriefingCard key={issue.id} issue={issue} onActionStatusChange={onActionStatusChange} />
        ))}
      </div>
    );
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-command-text">
          {department} Briefing
        </h2>
        <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2 px-3 py-2 bg-command-gray text-command-text text-sm rounded-md hover:bg-command-light-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.18-3.185m-3.18-3.182a8.25 8.25 0 00-11.664 0l-3.18 3.185" />
            </svg>
            <span>Refresh</span>
        </button>
      </div>
      {renderContent()}
    </div>
  );
};
