export interface Event {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  venue: string;
  eventdatetime: string;
}

export interface EventsResponse {
  success: boolean;
  data: Event[];
  message: string;
}

export type SeatStatus = "AVAILABLE" | "BOOKED" | "RESERVED";
export type SeatType = "VIP" | "Front Row" | "General Admission";

export interface Seat {
  seat_id: number;
  seat_number: string;
  seat_type: SeatType;
  price: number;
  status: SeatStatus;
  seconds_remaining: number | null;
}

export interface EventDetail extends Event {
  total_seats: string;
  available_seats: string;
  reserved_seats: string;
  booked_seats: string;
  seats: Seat[];
}

export interface EventDetailResponse {
  success: boolean;
  data: EventDetail;
  message: string;
}
