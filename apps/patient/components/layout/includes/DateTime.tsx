import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Doctor } from '@/components/DoctorCard'; // Assuming you have a Doctor type defined here

interface DateTimePickerProps {
    onDateTimeChange: (date: Date | null) => void;
    doctor: Doctor;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onDateTimeChange, doctor }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableTimes, setAvailableTimes] = useState<{ startTime: Date, endTime: Date }[]>([]);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        onDateTimeChange(date);
    };

    const filterDate = (date: Date) => {
        const day = date.getDay();
        return doctor.availableDays.includes(day);
    };

    const filterTime = (time: Date) => {
        const timeInMilliseconds = time.getTime();
        return doctor.availableTimes.some(slot => {
            const slotStart = new Date(slot.startTime).getTime();
            const slotEnd = new Date(slot.endTime).getTime();
            return timeInMilliseconds >= slotStart && timeInMilliseconds <= slotEnd;
        });
    };

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);

    return (
        <div className='rounded-xl py-12 px-5 pt-3'>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                className='ring-2 ring-slate-400 rounded-2xl px-4 py-2'
                placeholderText='Select a slot'
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30} // Smaller interval to better test the filter
                minDate={new Date()}
                maxDate={maxDate}
                filterDate={filterDate}
                filterTime={filterTime}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
            />
        </div>
    );
};

export default DateTimePicker;
