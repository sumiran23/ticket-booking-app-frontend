import { type Seat, type SeatStatus } from "@/types/event";
import { cn } from "@/lib/utils";

interface SeatComponentProps {
  seat: Seat;
  isSelected: boolean;
  onSelect: (seat: Seat) => void;
}

const getSeatStatusColor = (status: SeatStatus, isSelected: boolean) => {
  if (isSelected) return "bg-blue-500 hover:bg-blue-600 text-white";

  switch (status) {
    case "AVAILABLE":
      return "bg-green-100 hover:bg-green-200 text-green-800 border-green-300";
    case "BOOKED":
      return "bg-gray-300 text-gray-500 cursor-not-allowed";
    case "RESERVED":
      return "bg-yellow-100 text-yellow-600 cursor-not-allowed";
    default:
      return "bg-gray-100";
  }
};

export function SeatComponent({
  seat,
  isSelected,
  onSelect,
}: SeatComponentProps) {
  const isDisabled = seat.status === "BOOKED" || seat.status === "RESERVED";

  return (
    <button
      onClick={() => !isDisabled && onSelect(seat)}
      disabled={isDisabled}
      className={cn(
        "w-12 h-12 rounded-md border text-xs font-medium transition-all",
        getSeatStatusColor(seat.status, isSelected),
        !isDisabled && "hover:scale-105",
      )}
      title={`${seat.seat_number} - $${seat.price} - ${seat.status}`}
    >
      {seat.seat_number.split("-")[1]}
    </button>
  );
}
