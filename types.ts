
export enum Department {
  STATE_WIDE = 'State-Wide',
  HEALTH = 'Health',
  INFRASTRUCTURE = 'Infrastructure',
  PUBLIC_SAFETY = 'Public Safety',
}

export enum ActionStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

export interface RecommendedAction {
  id: number;
  text: string;
  priority: 'High' | 'Medium' | 'Low';
  status: ActionStatus;
}

export interface BriefingIssue {
  id: string;
  situation: string;
  impact: string;
  recommendedActions: RecommendedAction[];
  dataVisualization?: {
    type: 'line' | 'bar';
    data: any[];
    dataKey: string;
    name: string;
  };
}
