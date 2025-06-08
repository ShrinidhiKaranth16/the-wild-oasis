import { useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import Form from "../ui/Form";
import Input from "../ui/Input";
import FormRow from "../ui/FormRow";
import Textarea from "../ui/Textarea";
import FileInput from "../ui/FileInput";
import Button from "../ui/Button";
import BookingNewForm from "../features/bookings/BookingNewForm";

export const StyledError = styled.span`
  color: var(--color-red-500, red);
  font-size: 0.875rem;
  margin-top: 0.4rem;
`;

export default function NewBooking() {

  return (
    <>
    <h1>New Booking</h1>
    <BookingNewForm />
    </>
  );
}
