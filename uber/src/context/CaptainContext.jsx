import { createContext, useContext, useState, useEffect } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(() => {
    // Try to load from localStorage first
    const stored = localStorage.getItem('captain');
    return stored ? JSON.parse(stored) : { name: 'vishaka', email: 'vishakameena02@gmail.com', phone: '3984723', vehicle: 'vjkbh' };
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    console.log('updateCaptain called with:', captainData);
    setCaptain(captainData);
    localStorage.setItem('captain', JSON.stringify(captainData)); // persist
  };

  // Optional: keep context in sync with localStorage changes (e.g. on logout)
  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem('captain');
      setCaptain(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;