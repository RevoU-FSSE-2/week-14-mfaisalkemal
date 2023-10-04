import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useTokenChecker = (token: string | null) => {
    const navigate = useNavigate();

  const checkToken = useCallback(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);
};

export default useTokenChecker;