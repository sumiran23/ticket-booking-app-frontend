import type { Event } from "@/types/event";
import { EventCard } from "./EventCard";
import { useGetEventsQuery } from "../api/eventSlice";

function EventList() {
  const { data, isError, isFetching } = useGetEventsQuery(undefined);

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }

  if (data && !data.data.length) {
    return <div>No item Found</div>;
  }

  const events = data?.data as Event[];

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
          {events.map((event) => (
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

export default EventList;
