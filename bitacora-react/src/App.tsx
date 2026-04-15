import Header from './components/Header';
import LogForm from './components/LogForm';
import LogTable from './components/LogTable';
/* import { FuelLog } from './types'; 
 */
import type { FuelLog } from './types';
function App() {
  // hardcoded data just to test the table mapping
  const fakeLogs: FuelLog[] = [
    { id: '1', date: '2026-04-01', km: 11500, liters: 40 },
    { id: '2', date: '2026-04-08', km: 11900, liters: 38 },
    { id: '3', date: '2026-04-15', km: 12300, liters: 42 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <Header />
        <LogForm />
        {/* passing the fake data to the table using props */}
        <LogTable logs={fakeLogs} />
      </div>
    </div>
  );
}

export default App;