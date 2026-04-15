import { useState, useEffect } from 'react';
import Header from './components/Header';
import LogForm from './components/LogForm';
import LogTable from './components/LogTable';
import type { FuelLog } from './types'; 

function App() {
  // We initialize the state looking into localStorage first
  // so if we close the browser, data is still there
  const [logs, setLogs] = useState<FuelLog[]>(() => {
    const savedLogs = localStorage.getItem('nano_fuel_logs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  // Every time 'logs' changes, we automatically save to localStorage
  useEffect(() => {
    localStorage.setItem('nano_fuel_logs', JSON.stringify(logs));
  }, [logs]);

  // The function that LogForm will call to add a new entry
  const handleAddLog = (km: number, liters: number) => {
    const newLog: FuelLog = {
      id: crypto.randomUUID(), // generates a unique ID
      date: new Date().toISOString().split('T')[0], // gets today's date YYYY-MM-DD
      km: km,
      liters: liters
    };
    
    // We put the new log at the beginning of the array
    setLogs([newLog, ...logs]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <Header />
        {/* We pass the function to the form */}
        <LogForm onAddLog={handleAddLog} />
        {/* We pass the real state data to the table */}
        <LogTable logs={logs} />
      </div>
    </div>
  );
}

export default App;