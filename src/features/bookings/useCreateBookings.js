import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBookings() {
  const { isLoading: isCreatingBooking, mutateAsync: createBookingAsync } =
    useMutation({
      mutationFn: createBooking,
      onSuccess: () => {
        toast.success("Booking successfully created");
      },
      onError: (err) => toast.error(err.message),
    });

  return { isCreatingBooking, createBookingAsync };
}