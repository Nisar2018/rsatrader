import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl mt-10 p-4 sm:p-6">

        {/* Title */}
        <h1 className="text-center font-bold mb-6
                       text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Trader Reporting Page
        </h1>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          <MenuButton text="General Ledger" onClick={() => navigate('/Reportd')} />
          <MenuButton text="Account Balance" onClick={() => navigate('/accountBalance')} />
          <MenuButton text="Store Ledger" onClick={() => navigate('/storeLedger')} />

          <MenuButton text="Customer Balance" onClick={() => navigate('/customerBalance')} />
          <MenuButton text="Item Summary" onClick={() => navigate('/itemsummary')} />
          <MenuButton text="Sales Activity" onClick={() => navigate('/saleActivity')} />

          <MenuButton text="Purchase Activity" onClick={() => navigate('/purchaseActivity')} />
          <MenuButton text="Cash Book" onClick={() => navigate('/cashBook')} />
          <MenuButton text="Sales Summary" onClick={() => navigate('/SaleSummary')} />

          <MenuButton text="Dashboard" onClick={() => navigate('/dashboard')} />
          <MenuButton text="Logout" danger onClick={() => navigate('/logout')} />

        </div>
      </div>
    </div>
  );
}

/* Reusable Button Component */
function MenuButton({ text, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 rounded-lg font-medium transition
        text-xs sm:text-sm md:text-base
        ${danger
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
    >
      {text}
    </button>
  );
}
