export default function LogTable() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Consumption History</h2>
      
      <div className="overflow-x-auto">

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200">
              <th className="p-3 text-gray-800 font-bold">Date</th>

              <th className="p-3 text-gray-800 font-bold">Kilometers</th>
              
              <th className="p-3 text-gray-800 font-bold">Liters</th>
            </tr>
          </thead>
          <tbody>
            {/* r.i.p. my corsa classic, it was way cheaper to fill that one up :( */}

            <tr className="border-b hover:bg-gray-50 transition-colors">
              <td className="p-3 text-gray-900">2026-04-15</td>
              <td className="p-3 text-gray-900">12050 km</td>
              <td className="p-3 font-medium text-blue-700">35 L</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}