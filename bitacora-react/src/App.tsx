// src/App.tsx
import { useState, useEffect } from 'react';
import type { CalcResult, Load, Trip } from './models/types';
import { calculateStatics } from './utils/calculations';
import Header from './components/Header'; // Asegurate de tener estos componentes

function App() {
    const [trip, setTrip] = useState<Trip>(() => {
        const savedRecords = localStorage.getItem('bitacora_viaje');
        return savedRecords ? JSON.parse(savedRecords) : { initKm: 0, loads: [] };
    });

    const [results, setResults] = useState<CalcResult | null>(() => calculateStatics(trip));

    const [initKmInput, setInitKmInput] = useState<string>(trip.initKm?.toString() || '0');
    const [kmInput, setKmInput] = useState<string>('');
    const [litersInput, setLitersInput] = useState<string>('');

useEffect(() => {
    localStorage.setItem('bitacora_viaje', JSON.stringify(trip));
    
    // The results panel wasn't showing up at first when I added a new load.
    // I realized I needed to force the calculation to run inside this useEffect 
    // every time the 'trip' state changes so the UI stays in sync.
    setResults(calculateStatics(trip));
  }, [trip]);

    const addLoad = (e: React.FormEvent) => {
        e.preventDefault();
        const newLoad: Load = {
            km: Number(kmInput),
            liters: Number(litersInput)
        };
// Using the spread operator to ensure state immutability. 
    // Mutating the array directly (push) wasn't triggering the re-render.

        setTrip(prev => ({

            ...prev,
            loads: [...prev.loads, newLoad]
        }));

        setKmInput('');
        setLitersInput('');
    };

    const resetTrip = () => {
        if (confirm('¿Deseas borrar toda la bitácora?')) {
            setTrip({ initKm: null, loads: [] });
            setInitKmInput('0');
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen p-6 font-sans text-gray-900'>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
                {/* Panel de Registro */}
                <div className="md:w-1/2 bg-white p-6 rounded-2xl shadow-lg border-t-4 border-blue-500">
                    <Header /> 
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Registro de Carga</h2>
                    
                    <form onSubmit={addLoad} className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <label className="block text-sm font-bold text-blue-900 mb-1">KM Inicial del Vehículo</label>
                            <input
                                type="number"
                                value={initKmInput}
                                onChange={(e) => {
                                    const valor = Number(e.target.value);
                                    setInitKmInput(e.target.value);
                                    setTrip(prev => ({ ...prev, initKm: valor }));
                                }}
                                disabled={trip.loads.length > 0}
                                className="w-full p-2 border border-blue-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
                            />
                            {trip.loads.length > 0 && (
                                <p className="text-[10px] text-blue-600 mt-1 uppercase font-bold">KM Inicial fijado (Limpia el viaje para modificar)</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Kilometraje de Carga</label>
                            <input
                                type="number"
                                value={kmInput}
                                onChange={(e) => setKmInput(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Ej: 10450"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Litros Cargados</label>
                            <input
                                type="number"
                                value={litersInput}
                                onChange={(e) => setLitersInput(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Ej: 35"
                                required
                            />
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md">
                            Agregar Carga
                        </button>
                    </form>
                </div>

                {/* Panel de Historial y Resultados */}
                <div className="md:w-1/2 bg-white p-6 rounded-2xl shadow-lg flex flex-col">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Historial y Estadísticas</h2>
                    
                    <div className="flex-1 overflow-y-auto mb-4">
                        <p className="text-sm text-gray-600 mb-4 italic">
                            Iniciaste con: <span className="font-bold text-blue-600">{trip.initKm} km</span>
                        </p>
                        
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                                <tr>
                                    <th className="p-3">Lectura KM</th>
                                    <th className="p-3">Litros</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* R.I.P. Corsa Classic - El código vive por vos */}
                                {trip.loads.map((load, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                                        <td className="p-3 text-gray-700 font-medium">{load.km} km</td>
                                        <td className="p-3 text-blue-600 font-bold">{load.liters} L</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Resultados Dinámicos */}
                    {results ? (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl space-y-2 mb-4 animate-in slide-in-from-bottom-2 duration-500">
                            <p className="text-green-800 flex justify-between">
                                <span>Distancia Total:</span>
                                <span className="font-bold">{results.totalDistance} km</span>
                            </p>
                            <p className="text-green-800 flex justify-between border-t border-green-100 pt-2">
                                <span>Consumo Promedio:</span>
                                <span className="font-bold text-lg text-green-700">{results.averageConsumption.toFixed(2)} L/100km</span>
                            </p>
                        </div>
                    ) : (
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center mb-4">
                            <p className="text-gray-500 italic text-sm">Cargá datos para ver el promedio de consumo</p>
                        </div>
                    )}

                    <button onClick={resetTrip} className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-300 transition">
                        Limpiar Bitácora
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;