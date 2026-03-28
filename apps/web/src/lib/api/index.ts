import { Court, CourtType } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const MOCK_COURTS: Court[] = [
  {
    id: '1',
    name: 'Cancha Estadio Cavancha',
    description: 'La mejor cancha frente al mar',
    type: CourtType.FIVE_VS_FIVE,
    address: 'Av. Arturo Prat 123',
    city: 'Iquique',
    pricePerHour: 25000,
    ownerId: 'owner-1',
    isActive: true,
    amenities: { lighting: true, parking: true, showers: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [{ id: 'img-1', courtId: '1', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop', order: 0, createdAt: new Date().toISOString() }],
    schedule: [],
  },
  {
    id: '2',
    name: 'Complejo Deportivo Playa Brava',
    description: 'Canchas sintéticas de alto nivel',
    type: CourtType.SEVEN_VS_SEVEN,
    address: 'Av. Playa Brava 456',
    city: 'Iquique',
    pricePerHour: 35000,
    ownerId: 'owner-1',
    isActive: true,
    amenities: { lighting: true, parking: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [{ id: 'img-2', courtId: '2', url: 'https://images.unsplash.com/photo-1526232762682-d2f5f714d5bb?q=80&w=1000&auto=format&fit=crop', order: 0, createdAt: new Date().toISOString() }],
    schedule: [],
  },
];

export async function getCourts(filters?: any): Promise<Court[]> {
  try {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_URL}/courts?${query}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch from API');
    return res.json();
  } catch (error) {
    console.warn('API connection failed, returning mock data', error);
    return MOCK_COURTS;
  }
}

export async function getCourt(id: string): Promise<Court> {
  try {
    const res = await fetch(`${API_URL}/courts/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch from API');
    return res.json();
  } catch (error) {
    console.warn('API connection failed, returning mock data for ID:', id);
    const mock = MOCK_COURTS.find((c) => c.id === id);
    if (!mock) throw new Error('Court not found');
    return mock;
  }
}
