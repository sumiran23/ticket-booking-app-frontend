import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Lock } from "lucide-react";
import { useConfirmBookingMutation } from "../api/bookingSlice";
import { toast } from "react-toastify";

interface CheckoutState {
  eventId: string;
  seatIds: number[];
  total: number;
}

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as CheckoutState;

  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmBooking] = useConfirmBookingMutation();

  // Redirect if no state
  if (!state || !state.eventId || !state.seatIds || state.total === undefined) {
    navigate("/");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .substring(0, 19);
    }

    // Format expiry date as MM/YY
    if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substring(0, 5);
    }

    // Format CVV to only numbers
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4);
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const loadingOverlay = document.createElement("div");
      loadingOverlay.id = "reservation-loading";
      loadingOverlay.className =
        "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center";
      loadingOverlay.innerHTML = `
        <div class="bg-background p-8 rounded-lg shadow-xl text-center space-y-4">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <div class="space-y-2">
        <p class="text-xl font-semibold">Processing Payment...</p>
        <p class="text-sm text-muted-foreground">Please wait while we process your payment</p>
          </div>
        </div>
      `;
      document.body.appendChild(loadingOverlay);
      const response = await confirmBooking({
        eventId: state.eventId,
        reservedSeatIds: state.seatIds,
        cardDetails: {
          cardholder: formData.cardholderName,
          cardNumber: formData.cardNumber,
          expiry: formData.expiryDate,
          cvv: formData.cvv,
        },
      }).unwrap();

      const bookingConfirmationId = response.data.id;

      navigate("/booking-confirmation", {
        state: {
          bookingId: bookingConfirmationId,
        },
      });
    } catch (error) {
      console.error("Failed to reserve seats:", error);
      const err = error as APIError;
      toast.error(err.data.message, { theme: "colored" });
    } finally {
      document.getElementById("reservation-loading")?.remove();
      setIsProcessing(false);
    }
  };

  const isFormValid =
    formData.cardholderName.trim() !== "" &&
    formData.cardNumber.replace(/\s/g, "").length >= 13 &&
    formData.expiryDate.length === 5 &&
    formData.cvv.length >= 3;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-2">
            Complete your booking by providing payment details
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Cardholder Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="cardholderName"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Cardholder Name
                    </label>
                    <input
                      id="cardholderName"
                      name="cardholderName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.cardholderName}
                      onChange={handleChange}
                      required
                      className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  {/* Card Number */}
                  <div className="space-y-2">
                    <label
                      htmlFor="cardNumber"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Card Number
                    </label>
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                      className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  {/* Expiry Date and CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="expiryDate"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Expiry Date
                      </label>
                      <input
                        id="expiryDate"
                        name="expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="cvv"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        CVV
                      </label>
                      <input
                        id="cvv"
                        name="cvv"
                        type="text"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                        className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-start gap-2 p-4 bg-muted rounded-lg">
                    <Lock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">
                        Secure Payment
                      </p>
                      <p>
                        Your payment information is encrypted and secure. We do
                        not store your card details.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={!isFormValid || isProcessing}
                  >
                    {isProcessing
                      ? "Processing Payment..."
                      : `Pay $${state.total.toFixed(2)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Event ID</span>
                    <span className="font-medium">{state.eventId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Seats</span>
                    <span className="font-medium">
                      {state.seatIds.length} seat(s)
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold">
                      ${state.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground">
                    By completing this purchase, you agree to our terms of
                    service and acknowledge that your seats are reserved for 10
                    minutes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
