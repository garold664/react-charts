import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ONE_DAY = 86400000;

export default function DatesRangePicker({ dates, setSelectedDates }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (startDate || endDate) {
      const start = startDate
        ? new Date(startDate.setHours(0, 0, 0, 0)).getTime()
        : 0;
      const end = endDate
        ? new Date(endDate.setHours(0, 0, 0, 0)).getTime()
        : 99999999999999;
      const transformedDates = dates.map((date) => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        return newDate.getTime();
      });

      setSelectedDates(() => {
        const result = transformedDates
          .filter((date) => date >= start + ONE_DAY && date <= end + ONE_DAY)
          .map((date) => new Date(date).toISOString().split('T')[0]);
        return result;
      });
    }
    // eslint-disable-next-line
  }, [startDate, endDate, setSelectedDates]);
  return (
    <>
      <h2>Выберите даты</h2>
      <div className="date-picker">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          dateFormat="yyyy-MM-dd"
        />
        <span>to</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          dateFormat="yyyy-MM-dd"
        />
      </div>
    </>
  );
}
