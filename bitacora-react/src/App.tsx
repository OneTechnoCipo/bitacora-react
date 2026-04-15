import Header from './components/Header';
import LogForm from './components/LogForm';
import LogTable from './components/LogTable';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <Header />
        <LogForm />
        <LogTable />
      </div>
    </div>
  );
}

export default App;