export enum CourtType {
  FIVE_VS_FIVE = 'FIVE_VS_FIVE',
  SIX_VS_SIX = 'SIX_VS_SIX',
  SEVEN_VS_SEVEN = 'SEVEN_VS_SEVEN',
  ELEVEN_VS_ELEVEN = 'ELEVEN_VS_ELEVEN',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
  USER = 'USER',
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
}

export interface Court {
  id: string;
  name: string;
  description: string;
  type: CourtType;
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
  pricePerHour: number;
  ownerId: string;
  isActive: boolean;
  amenities: Record<string, boolean>;
  createdAt: string;
  updatedAt: string;
  images?: CourtImage[];
  schedule?: CourtSchedule[];
}

export interface CourtImage {
  id: string;
  courtId: string;
  url: string;
  order: number;
  createdAt: string;
}

export interface CourtSchedule {
  id: string;
  courtId: string;
  dayOfWeek: number; // 0=domingo, 6=sábado
  openTime: string; // '08:00'
  closeTime: string; // '23:00'
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  courtId: string;
  startTime: string;
  endTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  totalPrice: number;
}
