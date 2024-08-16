export interface Doctor {
    id: string;
    email: string;
    name?: string;
    image?: string;
    isVerified: boolean;
    phone?: string;
    hospitalId?: string;
}

export interface Appointment {
    id: string;
    date: Date;
    disease?: string;
    isApproved: boolean;
    doctorId: string;
    doctor: Doctor;
    patientId: string;
    patient: Patient;
}

export interface History {
    id: string;
    date: Date;
    appointmentdate: Date;
    disease?: string;
    doctorId: string;
    doctor: Doctor;
    patientId: string;
    patient: Patient;
}

export interface Patient {
    id: string;
    name: string;
    email: string;
    city: string;
}
