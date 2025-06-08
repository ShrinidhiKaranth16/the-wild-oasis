// BookingContext.js
import { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({});
  return (
    <BookingContext.Provider value={{ bookingData, setBookingData  }}>
      {children}
    </BookingContext.Provider>
  );
};

