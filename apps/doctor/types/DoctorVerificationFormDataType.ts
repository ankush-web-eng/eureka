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
  history: Appointment[];
}

interface Hospital {
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
interface Appointment {
  id: string
  date: Date
  disease?: string
  doctorId: string
}

export interface FormData {
  email: string;
  name: string;
  phone: string;
}

export interface TimeSlot {
  startTime: Date;
  endTime: Date;
}

export interface DoctorVerificationPayload extends FormData {
  image: string;
  availableTimes: TimeSlot[];
}