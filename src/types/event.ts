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
