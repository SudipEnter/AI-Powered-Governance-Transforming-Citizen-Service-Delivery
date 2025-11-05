
import { Department, BriefingIssue, ActionStatus } from '../types';

const mockData: Record<Department, BriefingIssue[]> = {
  [Department.STATE_WIDE]: [
    {
      id: 'sw-1',
      situation: 'Anomalous monsoon rainfall patterns detected across Western Ghats, increasing landslide and flood risks in multiple districts including Pune, Satara, and Kolhapur.',
      impact: 'Predicted displacement of over 50,000 people. Potential disruption to major highways (NH48, NH66) impacting supply chains. Agricultural losses estimated at ₹200 Crores.',
      recommendedActions: [
        { id: 1, text: 'Pre-deploy NDRF teams to high-risk zones and establish temporary shelters.', priority: 'High', status: ActionStatus.PENDING },
        { id: 2, text: 'Issue public alerts via SMS and media, advising restricted travel and evacuation readiness.', priority: 'High', status: ActionStatus.PENDING },
        { id: 3, text: 'Activate real-time reservoir level monitoring and coordinate controlled water release with irrigation department.', priority: 'Medium', status: ActionStatus.PENDING },
      ],
      dataVisualization: {
        type: 'line',
        name: 'Flood Risk Index',
        dataKey: 'risk',
        data: [
          { name: 'T-7d', risk: 2.1 },
          { name: 'T-3d', risk: 3.5 },
          { name: 'Today', risk: 4.8 },
          { name: 'T+3d', risk: 7.9 },
          { name: 'T+7d', risk: 8.5 },
        ]
      }
    },
    {
      id: 'sw-2',
      situation: 'Public sentiment analysis reveals growing concern over urban water scarcity in Aurangabad and Nagpur metropolitan regions, correlated with dropping groundwater levels.',
      impact: 'Increased probability of public protests by 35%. Potential for industrial production slowdown due to water rationing. Heightened risk of water-borne diseases.',
      recommendedActions: [
        { id: 1, text: 'Launch a public awareness campaign on water conservation and report on current government mitigation efforts.', priority: 'Medium', status: ActionStatus.PENDING },
        { id: 2, text: 'Deploy water tankers to critically affected areas as a temporary relief measure.', priority: 'High', status: ActionStatus.PENDING },
        { id: 3, text: 'Fast-track review of industrial water usage permits and enforce recycling mandates.', priority: 'Low', status: ActionStatus.PENDING },
      ],
    },
  ],
  [Department.HEALTH]: [
    {
      id: 'h-1',
      situation: 'Predictive models forecast a 45% surge in vector-borne disease cases (Dengue, Malaria) in Mumbai Metropolitan Region post-monsoon, based on climatic data and historical admission rates.',
      impact: 'Potential to overwhelm public hospital capacity by 25%, leading to bed shortages. Increased demand for blood platelets and antimalarial drugs.',
      recommendedActions: [
        { id: 1, text: 'Initiate city-wide fumigation and stagnant water clearing drives immediately.', priority: 'High', status: ActionStatus.PENDING },
        { id: 2, text: 'Stockpile essential medical supplies (testing kits, platelets, medication) at key hospitals.', priority: 'High', status: ActionStatus.PENDING },
        { id: 3, text: 'Run a public health campaign on preventive measures through digital and print media.', priority: 'Medium', status: ActionStatus.PENDING },
      ],
      dataVisualization: {
        type: 'line',
        name: 'Predicted Admissions',
        dataKey: 'admissions',
        data: [
          { name: 'Wk-2', admissions: 1200 },
          { name: 'Wk-1', admissions: 1500 },
          { name: 'Current', admissions: 1900 },
          { name: 'Wk+1', admissions: 3500 },
          { name: 'Wk+2', admissions: 4200 },
          { name: 'Wk+3', admissions: 5100 },
        ]
      }
    },
    {
      id: 'h-2',
      situation: 'Oracle agent reports a 30% decline in child vaccination rates in rural Vidarbha, identified by analyzing mobile health unit logs.',
      impact: 'Elevated risk of preventable disease outbreaks (e.g., Measles) among vulnerable populations. Could undermine years of public health progress.',
      recommendedActions: [
        { id: 1, text: 'Deploy mobile vaccination camps with ASHA workers to targeted villages.', priority: 'High', status: ActionStatus.PENDING },
        { id: 2, text: 'Engage local community leaders and influencers to address vaccine misinformation.', priority: 'Medium', status: ActionStatus.PENDING },
        { id: 3, text: 'Analyze logistics data to identify and resolve any supply chain bottlenecks for vaccines.', priority: 'Low', status: ActionStatus.PENDING },
      ],
    }
  ],
  [Department.INFRASTRUCTURE]: [
    {
      id: 'i-1',
      situation: 'Traffic sensor data fused with weather forecasts predicts a 60% probability of severe gridlock on the Mumbai-Pune Expressway during the upcoming long weekend.',
      impact: 'Average travel time could increase from 3 hours to 8+ hours. Economic impact due to delayed logistics and fuel wastage. Public frustration and safety risks.',
      recommendedActions: [
        { id: 1, text: 'Issue real-time traffic advisories and suggest alternative routes or travel times.', priority: 'High', status: ActionStatus.PENDING },
        { id: 2, text: 'Deploy additional highway patrol units to manage breakdowns and accidents swiftly.', priority: 'Medium', status: ActionStatus.PENDING },
        { id: 3, text: 'Temporarily suspend non-critical road work and open all toll lanes.', priority: 'High', status: ActionStatus.PENDING },
      ],
    },
    {
      id: 'i-2',
      situation: 'Analysis of power grid data indicates a 75% likelihood of transformer overload in key industrial zones near Thane due to a sustained heatwave.',
      impact: 'Risk of prolonged power outages affecting over 200 industrial units, leading to significant production and financial losses.',
      recommendedActions: [
        { id: 1, text: 'Request major industrial consumers to shift non-essential high-load operations to off-peak hours.', priority: 'High', status: ActionStatus.PENDING },
        { id: 2, text: 'Place mobile generator sets on standby for critical infrastructure like hospitals and water pumps.', priority: 'Medium', status: ActionStatus.PENDING },
        { id: 3, text: 'Expedite maintenance and cooling system checks on all substations in the identified risk area.', priority: 'Medium', status: ActionStatus.PENDING },
      ],
       dataVisualization: {
        type: 'bar',
        name: 'Grid Load Forecast',
        dataKey: 'load',
        data: [
          { name: '06:00', load: 65 },
          { name: '09:00', load: 80 },
          { name: '12:00', load: 92 },
          { name: '15:00', load: 98 },
          { name: '18:00', load: 85 },
          { name: '21:00', load: 70 },
        ]
      }
    }
  ],
  [Department.PUBLIC_SAFETY]: [
    {
      id: 'ps-1',
      situation: 'Social media sentiment analysis combined with event calendars indicates a high probability of large, unpermitted gatherings in central Nashik during the upcoming festival.',
      impact: 'Increased risk of stampedes, traffic chaos, and potential for public order disturbances. Strain on local law enforcement and emergency services.',
      recommendedActions: [
        { id: 1, text: 'Increase police visibility and establish temporary control rooms in the identified areas.', priority: 'High', status: ActionStatus.PENDING },
        // Fix: Corrected typo `_2` to `2` for the action id.
        { id: 2, text: 'Use drone surveillance for crowd monitoring and management.', priority: 'Medium', status: ActionStatus.PENDING },
        { id: 3, text: 'Work with festival organizers and community leaders to disseminate safety guidelines and designate safe zones.', priority: 'Medium', status: ActionStatus.PENDING },
      ],
    },
  ],
};

export const getStrategicBriefing = (department: Department): Promise<BriefingIssue[]> => {
  return new Promise((resolve) => {
    // Simulate network latency and AI synthesis time
    setTimeout(() => {
      resolve(mockData[department] || []);
    }, 1200 + Math.random() * 800);
  });
};
