import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cart/cartContext";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import {
  CartContainer,
  CartTitle,
  HorizontalCartItems,
  CartItemRow,
  CartItemImage,
  CartItemInfoColumn,
  CartItemName,
  CartItemDetails,
  CartItemCapacity,
  CartItemFeatures,
  CartItemPriceColumn,
  OriginalPrice,
  DiscountPrice,
  SavingsBadge,
  RemoveButton,
  CartSummary,
  SummaryRow,
  TotalRow,
  CheckoutButton,
  BackLink,
  EmptyCartMessage,
  CouponContainer,
  CouponInput,
  CouponButton,
  CouponMessage,
  CouponSuccess,
  CouponError,
  AvailableCouponsContainer,
  CouponCard,
  CouponCode,
  CouponValue,
  CouponDescription,
  CouponDivider,
  ApplyCouponButton,
} from "./CartCSS/CartPage";
import { Coupons } from "../../services/Coupons";

export default function CartPage() {
  const { selectedCabinsForCheckout, removeFromCart, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const calculateSubtotal = () => {
    return selectedCabinsForCheckout.reduce((total, cabin) => {
      return (
        total +
        (cabin.discount
          ? cabin.regularPrice - cabin.discount
          : cabin.regularPrice)
      );
    }, 0);
  };

  const navigate = useNavigate();

  const applyCoupon = () => {
    const coupon = couponCode.trim().toUpperCase();

    if (!coupon) {
      setCouponError("Please enter a coupon code");
      return;
    }

    if (Coupons[coupon]) {
      const value = Coupons[coupon];
      const subtotal = calculateSubtotal();

      let discount = 0;
      if (typeof value === "string" && value.endsWith("%")) {
        const percentage = parseFloat(value);
        discount = (subtotal * percentage) / 100;
      } else {
        discount = Math.min(parseFloat(value), subtotal);
      }

      setDiscountAmount(discount);
      setCouponError("");
      setIsCouponApplied(true);
      toast.success(`Coupon "${coupon}" applied successfully!`);
    } else {
      setDiscountAmount(0);
      setCouponError("Invalid coupon code");
      setIsCouponApplied(false);
      toast.error("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscountAmount(0);
    setCouponError("");
    setIsCouponApplied(false);
    toast.success("Coupon removed");
  };

  const calculateTax = () => {
    const subtotalAfterDiscount = calculateSubtotal() - discountAmount;
    return (subtotalAfterDiscount * 0.05).toFixed(2);
  };

  const calculateFinalTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = parseFloat(calculateTax());
    return (subtotal - discountAmount + tax).toFixed(2);
  };

  const handleCheckout = () => {
    if (selectedCabinsForCheckout.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  const handleRemoveItem = (cabin) => {
    removeFromCart(cabin);
  };

  return (
    <CartContainer>
      <CartTitle>Your Booking Cart</CartTitle>

      {selectedCabinsForCheckout.length === 0 ? (
        <EmptyCartMessage>
          <p>Your cart is empty</p>
          <Button onClick={() => navigate("/cabins")}>Browse Cabins</Button>
        </EmptyCartMessage>
      ) : (
        <>
          <HorizontalCartItems>
            {selectedCabinsForCheckout.map((cabin) => (
              <CartItemRow key={cabin.id}>
                <CartItemImage src={cabin.image} alt={cabin.name} />

                <CartItemInfoColumn>
                  <CartItemName>{cabin.name}</CartItemName>
                  <CartItemDetails>
                    <CartItemCapacity>
                      <span>👥 {cabin.maxCapacity} guests</span>
                      <span>🛏️ {cabin.bedrooms} bedrooms</span>
                      <span>🛁 {cabin.bathrooms} bathrooms</span>
                    </CartItemCapacity>
                    <CartItemFeatures>
                      {cabin.features?.slice(0, 3).map((feature, index) => (
                        <span key={index}>✓ {feature}</span>
                      ))}
                    </CartItemFeatures>
                  </CartItemDetails>
                </CartItemInfoColumn>

                <CartItemPriceColumn>
                  {cabin.discount > 0 ? (
                    <>
                      <DiscountPrice>
                        ${cabin.regularPrice - cabin.discount}
                      </DiscountPrice>
                      <OriginalPrice>${cabin.regularPrice}</OriginalPrice>
                      <SavingsBadge>Save ${cabin.discount}</SavingsBadge>
                    </>
                  ) : (
                    <DiscountPrice>${cabin.regularPrice}</DiscountPrice>
                  )}
                  <RemoveButton onClick={() => handleRemoveItem(cabin)}>
                    Remove
                  </RemoveButton>
                </CartItemPriceColumn>
              </CartItemRow>
            ))}
          </HorizontalCartItems>

          <AvailableCouponsContainer>
            <h3>Available Coupons</h3>
            <CouponDivider />
            {Object.entries(Coupons).map(([code, value]) => (
              <CouponCard key={code} isApplied={couponCode === code}>
                <div>
                  <CouponCode>{code}</CouponCode>
                  <CouponValue>
                    {typeof value === "string" ? value : `$${value} OFF`}
                  </CouponValue>
                  <CouponDescription>
                    {typeof value === "string"
                      ? `Get ${value} off your total`
                      : `Save $${value} on your booking`}
                  </CouponDescription>
                </div>
                {couponCode === code ? (
                  <ApplyCouponButton onClick={removeCoupon} applied>
                    Remove
                  </ApplyCouponButton>
                ) : (
                  <ApplyCouponButton
                    onClick={() => {
                      setCouponCode(code);
                      // Apply immediately when clicking from available coupons
                      const coupon = code;
                      if (Coupons[coupon]) {
                        const value = Coupons[coupon];
                        const subtotal = calculateSubtotal();

                        let discount = 0;
                        if (typeof value === "string" && value.endsWith("%")) {
                          const percentage = parseFloat(value);
                          discount = (subtotal * percentage) / 100;
                        } else {
                          discount = Math.min(parseFloat(value), subtotal);
                        }

                        setDiscountAmount(discount);
                        setCouponError("");
                        setIsCouponApplied(true);
                        toast.success(
                          `Coupon "${coupon}" applied successfully!`
                        );
                      }
                    }}
                  >
                    Apply
                  </ApplyCouponButton>
                )}
              </CouponCard>
            ))}
          </AvailableCouponsContainer>

          <CartSummary>
            <SummaryRow>
              <span>Subtotal ({selectedCabinsForCheckout.length} items):</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </SummaryRow>

            {discountAmount > 0 && (
              <SummaryRow>
                <span>Coupon Savings ({couponCode}):</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </SummaryRow>
            )}

            <SummaryRow>
              <span>Tax (5%):</span>
              <span>${calculateTax()}</span>
            </SummaryRow>

            <TotalRow>
              <span>Total:</span>
              <span>${calculateFinalTotal()}</span>
            </TotalRow>

            <CheckoutButton disabled={true} onClick={handleCheckout}>
              Proceed to Checkout
            </CheckoutButton>
          </CartSummary>
        </>
      )}
      <BackLink onClick={() => navigate(-1)}>← Continue Exploring</BackLink>
    </CartContainer>
  );
}
