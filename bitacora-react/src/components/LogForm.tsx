import { useState, useEffect } from 'react';

interface Props {
  onAddLog: (initKm: number, currentKm: number, liters: number) => void;
  hasLogs: boolean; // Para saber si bloqueamos el KM inicial
  currentInitKm: number | null; // Para mostrar el KM inicial guardado
}

export default function LogForm({ onAddLog, hasLogs, currentInitKm }: Props) {
  const [initKm, setInitKm] = useState('');
  const [km, setKm] = useState('');
  const [liters, setLiters] = useState('');

  // Si recargamos la página y hay un KM Inicial guardado, lo ponemos en el input
  useEffect(() => {
    if (currentInitKm !== null) {
      setInitKm(currentInitKm.toString());
    }
  }, [currentInitKm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initKm || !km || !liters) return;
    
    onAddLog(Number(initKm), Number(km), Number(liters));
    
    // Solo limpiamos los inputs actuales, el inicial queda fijo
    setKm('');
    setLiters('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Add New Fill-up</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        {/* INPUT 1: KM Inicial (Se bloquea si hasLogs es true) */}
        <div className="flex-1  min-w-30x">
          <label className="block text-sm text-gray-800 mb-1 font-bold">KM Inicial</label>
          <input 
            type="number" 
            value={initKm}
            onChange={(e) => setInitKm(e.target.value)}
            disabled={hasLogs}
            className={`w-full border p-2 rounded outline-none transition-colors ${hasLogs ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed' : 'border-gray-300 focus:ring-2 focus:ring-blue-400'}`} 
            placeholder="Ej: 10000" 
          />
        </div>

        {/* INPUT 2: KM Actual */}
        <div className="flex-1  min-w-30x">
          <label className="block text-sm text-gray-800 mb-1 font-bold">KM Actual</label>
          <input 
            type="number" 
            value={km}
            onChange={(e) => setKm(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none" 
            placeholder="Ej: 10500" 
          />
        </div>

        {/* INPUT 3: Litros */}
        <div className="flex-1 min-w-30x">
          <label className="block text-sm text-gray-800 mb-1 font-bold">Litros</label>
          <input 
            type="number" 
            value={liters}
            onChange={(e) => setLiters(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none" 
            placeholder="Ej: 40" 
          />
        </div>

        <div className="flex-none flex items-end w-full sm:w-auto mt-2 sm:mt-0">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800 transition-colors cursor-pointer w-full font-bold">
            Save Log
          </button>
        </div>
      </form>
    </div>
  );
}