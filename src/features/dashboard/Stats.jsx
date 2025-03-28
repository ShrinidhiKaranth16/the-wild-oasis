import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
export default function Stats({ bookings, confirmedStays ,numDays,cabinCount }) {
  const numBookings = bookings?.length;
const sales = bookings?.reduce((accumulator,cur) => accumulator + cur.totalPrice, 0);
const checkins = confirmedStays?.length;
const occupation = confirmedStays?.reduce((accumulator,cur) => accumulator + cur.numNights, 0)/(numDays*cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
            <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays/>}
        value={checkins}
      />
            <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupation*100)}%`}
      />
    </>
  );
}
