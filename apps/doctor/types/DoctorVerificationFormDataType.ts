export interface Doctor {
  id: string;
  email: string;
  name?: string;
  image?: string;
  isVerified: boolean;
  phone?: string;
  hospitalId?: string;
}

export interface DoctorInformation extends Doctor {
  availableTimes: TimeSlot[];
  hospital: Hospital;
  appointments: Appointment[];
  history: History[];
}

export interface TimeSlot {
  startTime: Date;
  endTime: Date;
}

export interface Hospital {
  id: string;
  name: string
  city: string
  address: string
  image: string
  fee: number
  availableDays: number[]
  diseases: string[]
  phones: string[]
}
export interface Appointment {
  id: string
  date: Date
  disease?: string
  isApproved: boolean;
  doctorId: string;
  doctor: Doctor
  patientId: string;
  patient: Patient
}

export interface History {
  id: string
  date: Date
  appointmentdate: Date
  disease?: string
  doctorId: string;
  doctor: Doctor
  patientId: string;
  patient: Patient
}

export interface Patient {
  id: string;
  name : string;
  email: string;
  city: string;
}

export interface FormData {
  email: string;
  name: string;
  phone: string;
}

export interface DoctorVerificationPayload extends FormData {
  image: string;
  availableTimes: TimeSlot[];
}