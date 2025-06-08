import { useContext } from "react";
import {  useCart } from "../cart/cartContext";
import {
  AddToCartButton,
  CabinDescription,
  CabinDetailsRow,
  CabinDiscount,
  CabinImage,
  CabinNameBottom,
  CabinPrice,
  ModalActions,
  ModalContent,
  RemoveFromCartButton,
} from "./CabinsCSS/AvailableCabins.styled";

export default function AvailableCabinModal({ cabin , onCloseModal }) {
  const {  addToCart, removeFromCart, isInCart} = useCart();
  const handleAdd = () => {
    addToCart(cabin);
    onCloseModal(); // Close the modal after adding to cart
  };
  const handleRemove = () => {
    removeFromCart(cabin);
    onCloseModal(); // Close the modal after removing from cart
  }
  const isAddedToCart = isInCart(cabin);
  return (
    <ModalContent>
      <CabinImage
        src={cabin.image || "/placeholder.jpg"}
        alt={cabin.name}
        style={{ borderRadius: "0.5rem", marginBottom: "1rem" }}
      />

      <CabinDescription>
        {cabin.description || "No description available."}
      </CabinDescription>

      <CabinDetailsRow>
        <CabinPrice>💲 {cabin.regularPrice} / night</CabinPrice>
        <div>👥 Sleeps {cabin.maxCapacity}</div>
      </CabinDetailsRow>

      {cabin.discount > 0 && (
        <CabinDiscount>🔥 {cabin.discount} OFF</CabinDiscount>
      )}

      <CabinNameBottom>{cabin.name}</CabinNameBottom>
      <ModalActions>
        {!isAddedToCart ? (
          <AddToCartButton onClick={handleAdd}>Add to Cart</AddToCartButton>
        ) : (
          <RemoveFromCartButton onClick={handleRemove}>
            Remove from Cart
          </RemoveFromCartButton>
        )}
      </ModalActions>
    </ModalContent>
  );
}
