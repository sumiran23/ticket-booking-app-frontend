import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, Home, Ticket } from "lucide-react";

interface ConfirmationState {
  bookingId: string;
}

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ConfirmationState;

  console.log("Booking Confirmation State:", state);

  // Redirect if no state
  if (!state || !state.bookingId) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-6 pb-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-green-500">
                <CheckCircle className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-green-600">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your tickets have been successfully booked
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Confirmation Details */}
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Confirmation ID
                </span>
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-primary" />
                  <span className="text-lg font-bold font-mono">
                    {state.bookingId}
                  </span>
                </div>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to your registered email
                  address with your booking details and ticket information.
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
              <h3 className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-100">
                What's Next?
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                <li>Check your email for the booking confirmation</li>
                <li>Save your confirmation ID for future reference</li>
                <li>
                  Visit "My Tickets" in your profile to view ticket details
                </li>
                <li>Arrive at the venue 30 minutes before the event</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => navigate("/")} className="flex-1" size="lg">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
            <Button
              onClick={() => navigate("/my-tickets")}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <Ticket className="mr-2 h-5 w-5" />
              View My Tickets
            </Button>
          </div>

          {/* Support Message */}
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Need help? Contact our support team at{" "}
              <a
                href="mailto:support@tickethub.com"
                className="text-primary hover:underline"
              >
                support@tickethub.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
