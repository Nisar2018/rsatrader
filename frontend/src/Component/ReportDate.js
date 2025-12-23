import React from 'react';

const ReportDate = ({ dateFrom, setDateFrom, dateTo, setDateTo }) => {
  return (
    <div className="w-full md:w-1/2 mb-4">

      {/* Row 1: Main Label */}
      <div className="mb-2">
        <label className="block font-semibold text-gray-700 text-sm sm:text-base">
          Date
        </label>
      </div>

      {/* Row 2: From / To */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        {/* From */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="dateFrom"
            className="text-gray-700 text-sm whitespace-nowrap"
          >
            From
          </label>
          <input
            type="date"
            id="dateFrom"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* To */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="dateTo"
            className="text-gray-700 text-sm whitespace-nowrap"
          >
            To
          </label>
          <input
            type="date"
            id="dateTo"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

      </div>
    </div>
  );
};

export default ReportDate;
