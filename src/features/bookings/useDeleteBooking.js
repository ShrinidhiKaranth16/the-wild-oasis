import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function  useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isDeleting, mutate: removeBooking } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/bookings");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, removeBooking };
}
