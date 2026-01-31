import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import EventList from "@/features/event/EventList";
import EventDetail from "@/features/event/EventDetail";
import { Provider } from "react-redux";
import { store } from "./app/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppContainer />,
    children: [
      { index: true, element: <EventList /> },
      { path: "event/:id", element: <EventDetail /> },
    ],
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
