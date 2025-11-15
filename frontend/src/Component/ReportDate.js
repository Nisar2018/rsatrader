import React from 'react';

const ReportDate = ({ dateFrom, setDateFrom, dateTo, setDateTo }) => {
    return (
        <div>
            <div className="row fw-bold mt-2">
                <div className="col col-sm-2">
                    <label htmlFor="dateFrom" className="form-label">Date From:</label>
                </div>
                <div className="col col-sm-4">
                    <label htmlFor="dateTo" className="form-label">Date To:</label>
                </div>
            </div>
            <div className="row fw-bold mb-4">
                <div className="col-sm-2">
                    <input
                        type="date"
                        className="form-control"
                        id="dateFrom"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                    />
                </div>
                <div className="col-sm-2">
                    <input
                        type="date"
                        className="form-control"
                        id="dateTo"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReportDate;
