import type { Event } from "@/types/event";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon } from "lucide-react";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {event.description}
        </p>
        <div className="flex items-start gap-2 text-sm">
          <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground">{event.venue}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CalendarIcon className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground">{formatDate(event.eventdatetime)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Book Tickets</Button>
      </CardFooter>
    </Card>
  );
}
