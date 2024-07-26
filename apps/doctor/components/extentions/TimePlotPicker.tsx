import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TimeSlotPickerProps {
  onTimeSlotChange: (startTime: Date, endTime: Date) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ onTimeSlotChange }) => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleStartTimeChange = (date: Date | null) => {
    setStartTime(date);
    if (date && endTime) {
      onTimeSlotChange(date, endTime);
    }
  };

  const handleEndTimeChange = (date: Date | null) => {
    setEndTime(date);
    if (startTime && date) {
      onTimeSlotChange(startTime, date);
    }
  };

  return (
    <div className='space-x-3'>
      <DatePicker
        selected={startTime}
        onChange={handleStartTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="Start Time"
        dateFormat="h:mm aa"
        placeholderText="Select Start Time"
        className='border rounded-xl p-2'
      />
      <DatePicker
        selected={endTime}
        onChange={handleEndTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="End Time"
        dateFormat="h:mm aa"
        placeholderText="Select End Time"
        className='border rounded-xl p-2'
      />
    </div>
  );
};

export default TimeSlotPicker;
