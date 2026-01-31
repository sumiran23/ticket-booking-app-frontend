import { useState } from "react";
import { EventList } from "@/features/event/EventList";
import { Navbar } from "@/components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Mock login - in real app this would call an API
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Mock logout - in real app this would clear tokens/session
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        userName="John Doe"
        userEmail="john@example.com"
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <EventList />
    </>
  );
}

export default App;
