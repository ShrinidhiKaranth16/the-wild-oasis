import React, { useState } from "react";
import { useBookingContext } from "../bookings/useBookingContext";
import { useAvailableCabins } from "./useAvailableCabins";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../ui/Modal";
import {
  Page,
  Title,
  Grid,
  CabinCard,
  CabinImage,
  CabinContent,
  CabinName,
  InfoRow,
  CabinTitle,
  CabinDescription,
  Price,
  DiscountTag,
  BackLink,
  ModalContent,
  CabinPrice,
  CabinDiscount,
  CabinDetailsRow,
  CabinNameBottom,
  AddToCartButton,
  ModalActions,
  RemoveFromCartButton,
} from "./CabinsCSS/AvailableCabins.styled";
import Button from "../../ui/Button";
import AvailableCabinModal from "./AvailableCabinModal";
import toast from "react-hot-toast";
import { useCart } from "../cart/cartContext";
import CartBar from "../cart/CartBar";

export default function AvailableCabins() {
  const { bookingData } = useBookingContext();
  const [searchParams] = useSearchParams();
  const checkInDate = searchParams.get("checkIn");
  const checkOutDate = searchParams.get("checkOut");  const {selectedCabinsForCheckout ,isInCart ,removeFromCart} = useCart();
  const availableCabins = useAvailableCabins(checkInDate, checkOutDate);
  const navigate = useNavigate();

  console.log("selectedCabinsForCheckout", selectedCabinsForCheckout);

  const renderCabinCard = (cabin) => (

    <Modal key={cabin.id}>
      <Modal.Open opens={cabin.id}>
        <CabinCard>
          <CabinImage src={cabin.image} alt={cabin.name} />

          <CabinContent>
            <CabinDetailsRow>
              <CabinPrice>${cabin.regularPrice}</CabinPrice>
              <InfoRow>👥 {cabin.maxCapacity}</InfoRow>
            </CabinDetailsRow>
            <CabinNameBottom>{cabin.name}</CabinNameBottom>
            <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            width: '100%'
          }}>
            
            <DiscountTag>{cabin.discount}$ Off</DiscountTag>
            
            {isInCart(cabin) && (
              <RemoveFromCartButton onClick={(e)=>{e.stopPropagation(); removeFromCart(cabin)}} >
                Remove from cart
              </RemoveFromCartButton>
            )}
          </div>
          </CabinContent>
        </CabinCard>
      </Modal.Open>

      <Modal.Window name={cabin.id}>
        <AvailableCabinModal cabin={cabin} />
      </Modal.Window>
    </Modal>
  );

  return (
    <>
    <Page>
      <Title>
        {checkInDate && checkOutDate
          ? `Available cabins for ${checkInDate} to ${checkOutDate}`
          : "Available cabins"}
      </Title>
      {availableCabins.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          No cabins available for the selected dates.
        </p>
      ) : (
        <Grid>{availableCabins.map(renderCabinCard)}</Grid>
      )}
      <BackLink onClick={() => navigate(-1)}>← Back</BackLink>
    </Page>
     {selectedCabinsForCheckout.length > 0 && (
      <CartBar cabins={selectedCabinsForCheckout} />
    )}
    </>
  );
}
