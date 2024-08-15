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

export interface Doctor {
  id: string;
  email: string;
  name?: string;
  image?: string;
  isVerified: boolean;
  phone?: string;
  hospitalId? : string;
}
