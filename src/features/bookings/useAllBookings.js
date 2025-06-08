import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";

export function useAllBookings() {
  const { isLoading, data: bookings, error } = useQuery({
    queryKey: ["all-bookings"],
    queryFn: () => getAllBookings(),
    retry: false,
  });

  return { bookings, isLoading, error };
}
