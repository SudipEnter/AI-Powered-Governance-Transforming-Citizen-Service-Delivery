
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartProps {
  data: any[];
  dataKey: string;
  name: string;
}

export const LineChartComponent: React.FC<ChartProps> = ({ data, dataKey, name }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            color: '#e2e8f0',
          }}
          labelStyle={{ color: '#94a3b8' }}
        />
        <Legend wrapperStyle={{fontSize: "12px"}}/>
        <Line type="monotone" dataKey={dataKey} name={name} stroke="#38bdf8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};
