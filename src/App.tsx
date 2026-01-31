import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import EventList from "@/features/event/EventList";
import EventDetail from "@/features/event/EventDetail";
import Login from "@/features/authentication/Login";
import Register from "@/features/authentication/Register";
import Checkout from "@/features/booking/Checkout";
import BookingConfirmation from "@/features/booking/BookingConfirmation";
import { Provider } from "react-redux";
import { store } from "./app/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppContainer />,
    children: [
      { index: true, element: <EventList /> },
      { path: "event/:id", element: <EventDetail /> },
      { path: "checkout", element: <Checkout /> },
      { path: "booking-confirmation", element: <BookingConfirmation /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />;
    </Provider>
  );
}

export default App;
