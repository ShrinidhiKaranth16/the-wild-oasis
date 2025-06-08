import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabins";

export function useCabin(id) {
  const { isLoading, data: cabin, error } = useQuery({
    queryKey: ["cabin", id],
    queryFn: (id) => getCabin(id),
  });

  return { cabin, isLoading, error };
}