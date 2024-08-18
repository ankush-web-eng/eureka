import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormattedDoctors } from '@/types/PatientType';

interface DateTimePickerProps {
    onDateTimeChange: (date: Date | null) => void;
    doctor: FormattedDoctors;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onDateTimeChange, doctor }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableTimes, setAvailableTimes] = useState<Date[]>([]);

    // useEffect(() => {
    //     if (selectedDate) {
    //         const availableTimesForDate = doctor.availableTimes.filter(slot => {
    //             const slotDate = new Date(slot.startTime);
    //             return slotDate.toDateString() === selectedDate.toDateString();
    //         });
            
    //         const times = availableTimesForDate.map(slot => new Date(slot.startTime));
    //         setAvailableTimes(times);
    //     }
    // }, [selectedDate, doctor.availableTimes]);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        onDateTimeChange(date);
    };

    const filterDate = (date: Date) => {
        const day = date.getDay();
        return doctor.availableDays.includes(day);
    };

    const filterTime = (time: Date) => {
        return availableTimes.some(availableTime => 
            time.getTime() === availableTime.getTime()
        );
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
                timeIntervals={30}
                minDate={new Date()}
                maxDate={maxDate}
                filterDate={filterDate}
                // filterTime={filterTime}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
                // includeTimes={availableTimes}
            />
        </div>
    );
};

export default DateTimePicker;