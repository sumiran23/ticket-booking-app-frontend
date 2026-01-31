import { apiSlice } from "./apiSlice";

export const eventSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({
        url: "events",
        method: "get",
      }),
    }),
    getEventById: builder.query({
      query: (eventId) => ({
        url: `events/${eventId}`,
        method: "get",
      }),
    }),
  }),
});

export const { useGetEventsQuery, useGetEventByIdQuery } = eventSlice;
