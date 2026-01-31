import { apiSlice } from "./apiSlice";

export const bookingSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    reserveSeats: builder.mutation({
      query: ({ eventId, seatIds }) => ({
        url: "booking/reserve",
        method: "put",
        data: {
          eventId,
          seatIds,
        },
      }),
    }),
    confirmBooking: builder.mutation({
      query: ({ eventId, reservedSeatIds, cardDetails }) => ({
        method: "put",
        url: "booking/confirm",
        data: { eventId, reservedSeatIds, cardDetails },
      }),
    }),
  }),
});

export const { useConfirmBookingMutation, useReserveSeatsMutation } =
  bookingSlice;
