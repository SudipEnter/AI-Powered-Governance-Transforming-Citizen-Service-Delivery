
import React, { useState, useEffect, useCallback, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Department, BriefingIssue, ActionStatus } from './types';
import { getStrategicBriefing } from './services/geminiService';

const App: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(Department.STATE_WIDE);
  const [briefing, setBriefing] = useState<BriefingIssue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const dashboardRef = useRef<HTMLElement>(null);

  const fetchBriefing = useCallback(async (department: Department) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getStrategicBriefing(department);
      setBriefing(data);
    } catch (err) {
      setError('Failed to fetch strategic briefing. The Synthesizer agent may be offline.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBriefing(selectedDepartment);
  }, [selectedDepartment, fetchBriefing]);

  const handleSelectDepartment = (department: Department) => {
    setSelectedDepartment(department);
    if(window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleActionStatusChange = (issueId: string, actionId: number, status: ActionStatus) => {
    setBriefing(currentBriefing =>
      currentBriefing.map(issue => {
        if (issue.id === issueId) {
          return {
            ...issue,
            recommendedActions: issue.recommendedActions.map(action => {
              if (action.id === actionId) {
                return { ...action, status };
              }
              return action;
            }),
          };
        }
        return issue;
      })
    );
  };
  
  const handleExportPDF = async () => {
      const dashboardElement = dashboardRef.current;
      if (!dashboardElement) return;

      setIsExporting(true);

      try {
        const canvas = await html2canvas(dashboardElement, {
            scale: 2,
            backgroundColor: '#1A202C',
            useCORS: true, 
        });

        const imgData = canvas.toDataURL('image/png');
        
        // Calculate dimensions
        const pdfWidth = canvas.width;
        const pdfHeight = canvas.height;

        const pdf = new jsPDF({
          orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
          unit: 'px',
          format: [pdfWidth, pdfHeight]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Project_Drishti_${selectedDepartment}_Briefing.pdf`);
      } catch (error) {
        console.error("Failed to export PDF:", error);
        setError("Could not generate PDF. Please try again.");
      } finally {
        setIsExporting(false);
      }
    };


  return (
    <div className="min-h-screen flex flex-col bg-command-blue text-command-text">
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        onExportPDF={handleExportPDF}
        isExporting={isExporting}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          selectedDepartment={selectedDepartment}
          onSelectDepartment={handleSelectDepartment}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <main ref={dashboardRef} className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Dashboard
            department={selectedDepartment}
            briefing={briefing}
            isLoading={isLoading}
            error={error}
            onRefresh={() => fetchBriefing(selectedDepartment)}
            onActionStatusChange={handleActionStatusChange}
          />
        </main>
      </div>
    </div>
  );
};

export default App;