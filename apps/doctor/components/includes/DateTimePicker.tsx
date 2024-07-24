// components/DateTimePicker.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateTimePickerProps {
    onDateTimeChange: (date: Date | null) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onDateTimeChange }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        onDateTimeChange(date);
    };
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);

    const minTime = new Date();
    minTime.setHours(6, 0, 0);

    const maxTime = new Date();
    maxTime.setHours(21, 0, 0);

    return (
        <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            minDate={new Date()}
            maxDate={maxDate}
            minTime={minTime}
            maxTime={maxTime}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"
        />
    );
};

export default DateTimePicker;
