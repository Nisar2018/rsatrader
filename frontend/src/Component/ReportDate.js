import React from 'react';

const ReportDate = ({ dateFrom, setDateFrom, dateTo, setDateTo }) => {
  return (
    <div className="w-full sm:w-3/4 mb-4">
      {/* Labels */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 font-semibold mb-2">
        <label
          htmlFor="dateFrom"
          className="text-gray-700 text-sm sm:text-base mb-1 sm:mb-0"
        >
          Date From:
        </label>
        <label
          htmlFor="dateTo"
          className="text-gray-700 text-sm sm:text-base mb-1 sm:mb-0"
        >
          Date To:
        </label>
      </div>

      {/* Inputs */}
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <input
          type="date"
          id="dateFrom"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 mb-2 sm:mb-0"
        />
        <input
          type="date"
          id="dateTo"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 rounded-md p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default ReportDate;
