import { QueryClient, useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { createGuest } from "../../services/apiGuests"

export function useCreateGuests() {
    const { isLoading: isCreatingGuest, mutateAsync: createGuestAsync } = useMutation({
      mutationFn: createGuest,
      onError: (err) => toast.error(err.message),
    });
  
    return { isCreatingGuest, createGuestAsync };
  }
  