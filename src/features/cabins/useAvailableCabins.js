import { useQuery } from "@tanstack/react-query";
import { isBefore, isAfter } from "date-fns" // or plain JS Date comparison
import { getCabins } from "../../services/apiCabins";
import { getAllBookings } from "../../services/apiBookings";
import { ca } from "date-fns/locale";

const checkDatesOverlap = (checkIn, checkOut, existingIn, existingOut) => {

  return (
    new Date(checkIn) < new Date(existingOut) &&
    new Date(checkOut) > new Date(existingIn)
  );
};

export function useAvailableCabins(checkInDate, checkOutDate) {

 // Log check-out date
  const { data: cabins = [] } = useQuery({
    queryKey: ["cabins"],
    queryFn: () => getCabins(),
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getAllBookings(),
  });
  
  if (!checkInDate || !checkOutDate) {
    return []; // or handle the case when dates are not provided
  }

  const availableCabins = cabins.filter((cabin) => {
    const bookingsForCabin = bookings.filter(
      (b) => b.cabinId === cabin.id
    );
    const hasOverlap = bookingsForCabin.some((b) =>
      checkDatesOverlap(checkInDate, checkOutDate, b.startDate, b.endDate)
    );
    return !hasOverlap;
  });
  return availableCabins;
}
