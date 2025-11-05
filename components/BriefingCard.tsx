
import React from 'react';
import { BriefingIssue, RecommendedAction, ActionStatus } from '../types';
import { LineChartComponent } from './LineChartComponent';
import { BarChartComponent } from './BarChartComponent';

const PriorityBadge: React.FC<{ priority: RecommendedAction['priority'] }> = ({ priority }) => {
  const colorClasses = {
    High: 'bg-command-red/10 text-command-red border-command-red/20',
    Medium: 'bg-command-yellow/10 text-command-yellow border-command-yellow/20',
    Low: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-mono font-semibold rounded-md border ${colorClasses[priority]}`}>
      {priority.toUpperCase()}
    </span>
  );
};

interface BriefingCardProps {
    issue: BriefingIssue;
    onActionStatusChange: (issueId: string, actionId: number, newStatus: ActionStatus) => void;
}

export const BriefingCard: React.FC<BriefingCardProps> = ({ issue, onActionStatusChange }) => {
  
  return (
    <div className="bg-command-gray border border-command-light-gray/50 rounded-lg shadow-lg flex flex-col transition-all duration-300 hover:shadow-command-highlight/20 hover:border-command-highlight/50">
      <div className="p-5 flex-grow">
        <div className="mb-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-command-highlight font-mono">Situation</h4>
          <p className="text-command-text mt-1">{issue.situation}</p>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-command-red font-mono">Predicted Impact</h4>
          <p className="text-command-text mt-1">{issue.impact}</p>
        </div>

        {issue.dataVisualization && (
          <div className="h-48 my-4 -ml-4">
            {issue.dataVisualization.type === 'line' ? 
              <LineChartComponent data={issue.dataVisualization.data} dataKey={issue.dataVisualization.dataKey} name={issue.dataVisualization.name} /> : 
              <BarChartComponent data={issue.dataVisualization.data} dataKey={issue.dataVisualization.dataKey} name={issue.dataVisualization.name}/>
            }
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-command-accent font-mono">Recommended Actions</h4>
          <ul className="space-y-4 mt-2">
            {issue.recommendedActions.map((action) => (
              <li key={action.id}>
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 pt-1">
                    <PriorityBadge priority={action.priority} />
                    </div>
                    <span className="text-command-text text-sm">{action.text}</span>
                </div>
                <div className="pl-12 pt-2 flex items-center space-x-3">
                    {action.status === ActionStatus.PENDING && (
                    <button
                        onClick={() => onActionStatusChange(issue.id, action.id, ActionStatus.IN_PROGRESS)}
                        className="px-2 py-1 text-xs font-semibold text-command-highlight bg-command-highlight/10 border border-command-highlight/20 rounded-md hover:bg-command-highlight/20 transition-colors"
                    >
                        Mark as In Progress
                    </button>
                    )}
                    {action.status === ActionStatus.IN_PROGRESS && (
                    <>
                        <span className="text-xs font-mono text-command-yellow animate-pulse">IN PROGRESS</span>
                        <button
                        onClick={() => onActionStatusChange(issue.id, action.id, ActionStatus.COMPLETED)}
                        className="px-2 py-1 text-xs font-semibold text-command-accent bg-command-accent/10 border border-command-accent/20 rounded-md hover:bg-command-accent/20 transition-colors"
                        >
                        Mark as Completed
                        </button>
                    </>
                    )}
                    {action.status === ActionStatus.COMPLETED && (
                    <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold text-command-accent">
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>COMPLETED</span>
                    </div>
                    )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
