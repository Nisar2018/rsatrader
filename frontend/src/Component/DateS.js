import React from 'react';

const ReportDate = ({ dateTo, setDateTo }) => {
  return (
    <div className="mb-4 w-full sm:w-3/4">
      <div className="mb-2">
        <label
          htmlFor="dateTo"
          className="block text-gray-700 font-semibold text-sm sm:text-base"
        >
          Date To:
        </label>
      </div>
      <div>
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
