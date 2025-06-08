// src/features/cart/CartBar.jsx
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CartContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #3b82f6;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  font-size: 0.95rem;
`;

const PriceInfo = styled.div`
  font-weight: 500;
`;

const ProceedButton = styled.button`
  background: white;
  color: #3b82f6;
  padding: 0.4rem 0.9rem;
  border-radius: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;

  &:hover {
    background: #e0e7ff;
  }
`;

export default function CartBar({ cabins }) {
  const navigate = useNavigate();

  const totalPrice = cabins.reduce(
    (acc, cabin) =>
      acc + (cabin.regularPrice - cabin.discount || cabin.regularPrice),
    0
  );

  return (
    <CartContainer>
      <PriceInfo>
        {cabins.length} cabin{cabins.length > 1 ? "s" : ""} | Total:{" "}
        <strong>${totalPrice.toFixed(2)}</strong>
      </PriceInfo>
      <ProceedButton onClick={() => navigate("/cart")}>
        Checkout
      </ProceedButton>
    </CartContainer>
  );
}
