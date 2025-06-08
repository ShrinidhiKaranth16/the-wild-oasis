import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

export default function BookingNew() {
  const navigate = useNavigate();
  return <Button onClick={() => navigate("/bookings/new")}>New Booking</Button>;
}
