import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Seat, SeatType } from "@/types/event";
import { SeatComponent } from "@/components/Seat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, ArrowLeft, Users } from "lucide-react";
import { useGetEventByIdQuery } from "../api/eventSlice";
import { AuthPromptModal } from "@/components/AuthPromptModal";
import { useAppSelector } from "@/app/hooks";
import { useReserveSeatsMutation } from "../api/bookingSlice";
import { toast } from "react-toastify";

function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isError, isFetching } = useGetEventByIdQuery(id);
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { accessToken } = useAppSelector((state) => state.auth);
  const isAuthenticated = Boolean(accessToken);
  const [reserveSeats] = useReserveSeatsMutation();

  const event = data?.data;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Group seats by type
  const seatsByType = useMemo(() => {
    return event?.seats?.reduce(
      (acc, seat) => {
        if (!acc[seat.seat_type]) {
          acc[seat.seat_type] = [];
        }
        acc[seat.seat_type].push(seat);
        return acc;
      },
      {} as Record<SeatType, Seat[]>,
    );
  }, [event?.seats]);

  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeats((prev) => {
      const isSelected = prev.some((s) => s.seat_id === seat.seat_id);
      if (isSelected) {
        return prev.filter((s) => s.seat_id !== seat.seat_id);
      }
      return [...prev, seat];
    });
  };

  const handleProceedToCheckout = async () => {
    try {
      const loadingOverlay = document.createElement("div");
      loadingOverlay.id = "reservation-loading";
      loadingOverlay.className =
        "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center";
      loadingOverlay.innerHTML = `
        <div class="bg-background p-8 rounded-lg shadow-xl text-center space-y-4">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <div class="space-y-2">
        <p class="text-xl font-semibold">Checking Availability...</p>
        <p class="text-sm text-muted-foreground">Please wait while we prepare your reservation</p>
          </div>
        </div>
      `;
      document.body.appendChild(loadingOverlay);

      const seatIds = selectedSeats.map((seat) => seat.seat_id);
      await reserveSeats({
        eventId: id!,
        seatIds: seatIds,
      }).unwrap();

      navigate(`/checkout`, {
        state: {
          eventId: id,
          seatIds: seatIds,
          total: totalPrice,
        },
      });
    } catch (error) {
      console.error("Failed to reserve seats:", error);
      const err = error as APIError;
      toast.error(err.data.message, { theme: "colored" });
    } finally {
      document.getElementById("reservation-loading")?.remove();
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const renderSeatSection = (seatType: SeatType) => {
    const seats = seatsByType[seatType] || [];
    const seatsPerRow = seatType === "General Admission" ? 10 : 5;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{seatType}</h3>
          <span className="text-sm text-muted-foreground">
            ${seats[0]?.price || 0} per seat
          </span>
        </div>
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${seatsPerRow}, minmax(0, 1fr))`,
          }}
        >
          {seats.map((seat) => (
            <SeatComponent
              key={seat.seat_id}
              seat={seat}
              isSelected={selectedSeats.some((s) => s.seat_id === seat.seat_id)}
              onSelect={handleSeatSelect}
            />
          ))}
        </div>
      </div>
    );
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Event Image */}
            <div className="md:col-span-1">
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            {/* Event Info */}
            <div className="md:col-span-2 space-y-4">
              <h1 className="text-4xl font-bold">{event.title}</h1>
              <p className="text-muted-foreground">{event.description}</p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                  <span>{formatDate(event.eventdatetime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-muted-foreground" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span>
                    {event.available_seats} / {event.total_seats} available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seat Selection */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Seating Area */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Select Your Seats</h2>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mb-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 border border-green-300 rounded"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  <span className="text-sm">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  <span className="text-sm">Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-100 rounded"></div>
                  <span className="text-sm">Reserved</span>
                </div>
              </div>

              {/* Stage Indicator */}
              <div className="mb-8 p-4 bg-gradient-to-b from-gray-800 to-gray-600 text-white text-center rounded-lg">
                <span className="font-semibold">STAGE</span>
              </div>

              {/* Seat Sections */}
              <div className="space-y-8">
                {renderSeatSection("VIP")}
                {renderSeatSection("Front Row")}
                {renderSeatSection("General Admission")}
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Selected Seats ({selectedSeats.length})
                  </p>
                  {selectedSeats.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">
                      No seats selected
                    </p>
                  ) : (
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {selectedSeats.map((seat) => (
                        <div
                          key={seat.seat_id}
                          className="flex justify-between text-sm"
                        >
                          <span>{seat.seat_number}</span>
                          <span className="font-medium">${seat.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    disabled={selectedSeats.length === 0}
                    onClick={() => {
                      if (!isAuthenticated) {
                        setShowAuthModal(true);
                      } else {
                        handleProceedToCheckout();
                      }
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Seats will be reserved for 10 minutes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Auth Prompt Modal */}
      <AuthPromptModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
}

export default EventDetail;
