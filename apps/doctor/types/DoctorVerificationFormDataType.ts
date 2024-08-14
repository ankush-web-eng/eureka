export interface FormData {
    email: string;
    name: string;
    hospital: string;
    city: string;
    address: string;
    profile: string;
    phone: string;
    fee: string;
    diseases: string[];
}
export interface City {
    city: string;
}

export interface TimeSlot {
    startTime: Date;
    endTime: Date;
}