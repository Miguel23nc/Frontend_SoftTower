import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CleanUrlWrapper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.endsWith('/')) {
      navigate(location.pathname.slice(0, -1) + location.search, { replace: true });
    }
  }, [location, navigate]);

  return children;
};

export default CleanUrlWrapper;
