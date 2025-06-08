import styled from "styled-components";
import Button from "../../../ui/Button";

export const CartContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const CartTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--color-grey-800);
  text-align: center;
`;

export const HorizontalCartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

export const CartItemRow = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  align-items: center;
`;

export const CartItemImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
`;

export const CartItemInfoColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CartItemName = styled.h3`
  font-size: 1.3rem;
  color: var(--color-grey-800);
  margin: 0;
`;

export const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CartItemCapacity = styled.div`
  display: flex;
  gap: 1.5rem;
  color: var(--color-grey-600);
  font-size: 0.9rem;
`;

export const CartItemFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  font-size: 0.9rem;
  color: var(--color-grey-700);

  span {
    background: var(--color-grey-200);
    padding: 0.3rem 0.6rem;
    border-radius: 100px;
  }
`;

export const CartItemPriceColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  min-width: 150px;
`;

export const DiscountPrice = styled.span`
  font-weight: 600;
  font-size: 1.3rem;
  color: var(--color-brand-600);
`;

export const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: var(--color-grey-500);
  font-size: 0.9rem;
`;

export const SavingsBadge = styled.span`
  background-color: var(--color-green-100);
  color: var(--color-green-700);
  padding: 0.3rem 0.6rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
`;

export const RemoveButton = styled.button`
  background-color: var(--color-red-100);
  color: var(--color-red-700);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-weight: 500;
  margin-top: 0.5rem;

  &:hover {
    background-color: var(--color-red-200);
  }
`;

export const CartSummary = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  margin-left: auto;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const TotalRow = styled(SummaryRow)`
  font-weight: 600;
  font-size: 1.2rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-grey-300);
`;

export const CheckoutButton = styled(Button)`
  width: 100%;
  margin-top: 1.5rem;
`;

export const BackLink = styled.button`
  display: block;
  margin: 2rem auto 0;
  background: none;
  border: none;
  color: var(--color-brand-600);
  text-decoration: underline;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    color: var(--color-brand-700);
  }
`;

export const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  
  p {
    font-size: 1.2rem;
    color: var(--color-grey-600);
    margin-bottom: 1.5rem;
  }
`;

export const CouponContainer = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const CouponInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  &:disabled {
    background-color: #e9ecef;
    cursor: not-allowed;
  }
`;

export const CouponButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.remove ? '#dc3545' : '#28a745'};
  color: white;
  border: none;
  border-radius: ${props => props.remove ? '0 4px 4px 0' : '0'};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.remove ? '#c82333' : '#218838'};
  }
`;

export const CouponMessage = styled.p`
  margin-top: 0.75rem;
  color: #6c757d;
  font-size: 0.9rem;
  text-align: center;
`;

export const CouponSuccess = styled.p`
  margin-top: 0.75rem;
  color: #28a745;
  font-size: 0.9rem;
  text-align: center;
  font-weight: 500;
`;

export const CouponError = styled.p`
  margin-top: 0.75rem;
  color: #dc3545;
  font-size: 0.9rem;
  text-align: center;
  font-weight: 500;
`;

export const AvailableCouponsContainer = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #343a40;
    font-size: 1.25rem;
  }
`;

export const CouponCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.75rem;
  background-color: ${props => props.isApplied ? '#e8f5e9' : 'white'};
  border: 1px solid ${props => props.isApplied ? '#4caf50' : '#e0e0e0'};
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const CouponCode = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  color: #2e7d32;
  margin-bottom: 0.25rem;
`;

export const CouponValue = styled.div`
  font-size: 0.9rem;
  color: #424242;
  margin-bottom: 0.25rem;
`;

export const CouponDescription = styled.div`
  font-size: 0.8rem;
  color: #616161;
`;

export const CouponDivider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #e0e0e0;
  margin: 1rem 0;
`;

export const ApplyCouponButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.applied ? '#4caf50' : '#2196f3'};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.applied ? '#3d8b40' : '#0d8bf2'};
  }
`;