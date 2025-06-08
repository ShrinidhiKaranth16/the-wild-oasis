import styled from "styled-components";

export const Page = styled.div`
    min-height: 100vh;
    background: #f9fafb;
    padding: 2rem;
`;

export const Title = styled.h1`
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
`;

export const CabinCard = styled.div`
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
    display: flex;
    flex-direction: column;
`;

export const CabinImage = styled.img`
    width: 100%;
    height: 180px;
    object-fit: cover;
`;

export const CabinContent = styled.div`
    padding: 1rem;
`;

export const CabinName = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

export const InfoRow = styled.div`
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
    color: #4b5563;
`;

export const Price = styled.div`
    font-weight: 600;
    margin-top: 0.5rem;
`;

export const DiscountTag = styled.span`
    display: inline-block;
    margin-left: 0.5rem;
    background-color: #facc15;
    color: #92400e;
    font-weight: 500;
    font-size: 0.85rem;
    padding: 0.2rem 0.5rem;
    border-radius: 0.375rem;
`;

export const BackLink = styled.button`
    display: block;
    margin: 2rem auto 0;
    background: none;
    border: none;
    color: #3b82f6;
    text-decoration: underline;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        color: #2563eb;
    }
`;

export const ModalContent = styled.div`
    padding: 1.5rem;
`;

export const CabinTitle = styled.h2`
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
    color: #1f2937;
`;

export const CabinDescription = styled.p`
    margin-bottom: 1.25rem;
    color: #4b5563;
    line-height: 1.6;
    font-size: 1rem;
`;

export const CabinPrice = styled.div`
    font-weight: 700;
    font-size: 1.125rem;
    color: #111827;
`;

export const CabinDiscount = styled.div`
    margin-top: 0.5rem;
    background-color: #fef08a;
    color: #92400e;
    padding: 0.25rem 0.75rem;
    border-radius: 0.375rem;
    font-weight: 600;
    font-size: 0.9rem;
    display: inline-block;
`;

export const CabinFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
`;

export const CabinNameBottom = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-top: 1rem;
  color: #1f2937;
`;

export const CabinDetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1rem;
  color: #111827;
`;

export const AddToCartButton = styled.button`
  margin-top: 1.5rem;
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;
export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

export const RemoveFromCartButton = styled.button`
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;

  &:hover {
    background-color: #cc0000;
  }
`;


