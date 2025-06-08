import { useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Checkbox from "../../ui/Checkbox";
import { useCreateGuests } from "./useCreateGuests";
import { subtractDates } from "../../utils/helpers";
import { useCabins } from "../cabins/useCabins";
import { useSettings } from "../settings/useSettings";
import { useCreateBookings } from "./useCreateBookings";
import { useBookingContext } from "./useBookingContext";
import { useNavigate } from "react-router-dom";

export const StyledError = styled.span`
  color: var(--color-red-500, red);
  font-size: 0.875rem;
  margin-top: 0.4rem;
`;

export default function BookingNewForm() {
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { createGuestAsync, isCreatingGuest } = useCreateGuests();
  const {isCreatingBooking, createBookingAsync} = useCreateBookings();
  const { settings } = useSettings();
  const { isLoading, cabins } = useCabins();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const { bookingData, setBookingData } = useBookingContext(); 
  const cabinNumber = 90;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const {
      name,
      email,
      nationality,
      nationalId,
      numberOfGuests,
      checkInDate,
      checkOutDate,
      observations,
    } = data;

    const newlyCreatedGuest = {
      fullName: name,
      email,
      nationality,
      nationalID: nationalId,
      countryFlag: "https://flagcdn.com/pt.svg",
    };

    // Use the newlyCreatedGuest object (e.g., send it to an API)
    const guest = await createGuestAsync(newlyCreatedGuest);
    const numNights = subtractDates(checkOutDate, checkInDate);
    const cabin = cabins.find((cabin) => cabin.id === cabinNumber);
    const cabinPrice =
      (cabin.regularPrice - cabin.discount) * numNights * numberOfGuests;
    const extrasPrice = addBreakfast
      ? settings.breakfastPrice * numberOfGuests * numNights
      : 0;
    const totalPrice = cabinPrice + extrasPrice;
    const status = confirmPaid ? "checked-in" : "unconfirmed";
    const hasBreakfast = addBreakfast;
    const isPaid = confirmPaid;
    const newBooking = {
      startDate: checkInDate,
      endDate: checkOutDate,
      numNights,
      numGuests: numberOfGuests,
      cabinPrice,
      extrasPrice,
      totalPrice,
      status,
      hasBreakfast,
      isPaid,
      observations,
      guestId: guest[0].id,
      cabinId: cabinNumber,
    };
    createBookingAsync(newBooking);
    reset();
  };

  const onSubmit1 = async (data) => {
    setBookingData({
      name: data.name,
      email: data.email,
      nationality: data.nationality,
      nationalId: data.nationalId,
      numberOfGuests: data.numberOfGuests,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
    });
  
    const searchParams = new URLSearchParams();
    searchParams.set("checkIn", data.checkInDate);
    searchParams.set("checkOut", data.checkOutDate);
    localStorage.removeItem("selectedCabinsForCheckout");
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    navigate(`/bookings/available-cabins?${searchParams.toString()}`);
  };
  

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit1)}>
        <FormRow label="name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"

            {...register("name", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow
          label="Number of Guests"
          error={errors?.numberOfGuests?.message}
        >
          <Input
            type="number"
            id="numberOfGuests"
            {...register("numberOfGuests", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Capacity should be at least 1",
              },
            })}
          />
        </FormRow>

        <FormRow label="Email" error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
        </FormRow>

        <FormRow label="Check-in Date" error={errors?.checkInDate?.message}>
          <Input
            type="date"
            id="checkInDate"
            {...register("checkInDate", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Check-out Date" error={errors?.checkOutDate?.message}>
          <Input
            type="date"
            id="checkOutDate"
            {...register("checkOutDate", {
              required: "This field is required",
            })}
          />
        </FormRow>

        {/* <FormRow label="Cabin Number" error={errors?.cabinNumber?.message}>
          <select
            id="cabinNumber"
            {...register("cabinNumber", { required: "This field is required" })}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </FormRow> */}

        <FormRow label="Nationality" error={errors?.nationality?.message}>
          <Input
            type="text"
            id="nationality"
            {...register("nationality", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="national ID" error={errors?.nationalId?.message}>
          <Input
            type="text"
            id="nationalId"
            {...register("nationalId", { required: "This field is required" })}
          />
        </FormRow>

        {/* <FormRow label="notes" error={errors?.observations?.message}>
          <Input
            type="text"
            id="observations"
            {...register("observations", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="BreakFast Included?">
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast(!addBreakfast);
              setConfirmPaid(false);
            }}
          />
        </FormRow>

        <FormRow label="Booking Paid?">
          <Checkbox
            checked={confirmPaid}
            onChange={() => setConfirmPaid(!confirmPaid)}
          />
        </FormRow> */}

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button>Show Available Cabins</Button>
        </FormRow>
      </Form>
    </>
  );
}
