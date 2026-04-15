export default function LogForm() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Add New Fill-up</h2>
      
      <form className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-40">
          <label className="block text-sm text-gray-800 mb-1 font-bold">Current Km</label>
          <input type="number" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none" placeholder="ex: 15000" />
        </div>
        
        <div className="flex-1 min-w-40">
          <label className="block text-sm text-gray-800 mb-1 font-bold">Liters Added</label>
          <input type="number" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none" placeholder="ex: 40" />
        </div>

        <div className="flex-none flex items-end">
          <button type="button" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800 transition-colors cursor-pointer w-full font-bold">
            Save Log
          </button>
        </div>
      </form>
    </div>
  );
}