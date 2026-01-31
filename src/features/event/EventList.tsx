import type { Event } from "@/types/event";
import { EventCard } from "./EventCard";

// Mock data for events
const mockEvents: Event[] = [
  {
    id: 1,
    title: "Rock Legends Live Concert",
    description:
      "Experience an unforgettable night with the greatest rock bands of all time. Featuring electric guitar solos, powerful drum beats, and classic rock anthems that will make you jump to your feet!",
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
    venue: "Madison Square Garden, New York",
    eventdatetime: "2026-03-15T13:45:00.000Z",
  },
  {
    id: 2,
    title: "Comedy Night with Sarah Chen",
    description:
      "Get ready to laugh until your sides hurt! Award-winning comedian Sarah Chen brings her hilarious new show with fresh jokes about everyday life, relationships, and the absurdities of modern technology.",
    thumbnail: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca",
    venue: "Hollywood Bowl, Los Angeles",
    eventdatetime: "2026-04-22T14:15:00.000Z",
  },
  {
    id: 3,
    title: "Classical Symphony Orchestra",
    description:
      "Immerse yourself in the timeless beauty of classical music. The Metropolitan Orchestra performs Beethoven, Mozart, and Tchaikovsky under the baton of renowned conductor Marcus Williams.",
    thumbnail: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6",
    venue: "Carnegie Hall, New York",
    eventdatetime: "2026-05-10T12:15:00.000Z",
  },
  {
    id: 4,
    title: "EDM Festival 2026",
    description:
      "The biggest electronic dance music festival of the year! Featuring world-class DJs, mind-blowing visuals, laser shows, and non-stop beats that will keep you dancing all night long.",
    thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
    venue: "Las Vegas Convention Center, Nevada",
    eventdatetime: "2026-06-20T15:15:00.000Z",
  },
  {
    id: 5,
    title: "Jazz & Blues Evening",
    description:
      "A sophisticated evening of smooth jazz and soulful blues. Enjoy world-class musicians performing intimate sets in a cozy atmosphere. Wine and cocktails available.",
    thumbnail: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f",
    venue: "Blue Note Jazz Club, Chicago",
    eventdatetime: "2026-07-08T13:15:00.000Z",
  },
];

export function EventList() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Upcoming Events</h2>
          <p className="text-muted-foreground">
            Browse through our collection of exciting events
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2026 TicketHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
