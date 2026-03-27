export interface User {
  id: string;
  email: string;
  name: string;
  role: 'PLAYER' | 'OWNER' | 'ADMIN';
}

export interface Court {
  id: string;
  name: string;
  type: '5x5' | '7x7' | '11x11';
  location: string;
  pricePerHour: number;
  imageUrl?: string;
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
