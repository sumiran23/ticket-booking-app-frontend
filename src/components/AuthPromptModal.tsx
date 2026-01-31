import { useNavigate, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

interface AuthPromptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthPromptModal({ open, onOpenChange }: AuthPromptModalProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    // Pass current location as state so we can redirect back after login
    navigate("/login", { state: { from: location.pathname } });
  };

  const handleRegister = () => {
    // Pass current location as state so we can redirect back after registration
    navigate("/register", { state: { from: location.pathname } });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Authentication Required
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            You need to be logged in to proceed with the checkout. Please login
            to your account or create a new one.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-col gap-3 mt-4">
          <Button onClick={handleLogin} className="w-full" size="lg">
            <LogIn className="mr-2 h-5 w-5" />
            Login to Existing Account
          </Button>
          <Button
            onClick={handleRegister}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Create New Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
