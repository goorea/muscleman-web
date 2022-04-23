import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { JWTTokenState } from '@src/recoils';

const useLogout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setJWTToken = useSetRecoilState(JWTTokenState);

  return () => {
    setJWTToken(null);
    localStorage.removeItem('@token');
    localStorage.removeItem('@refreshToken');
    sessionStorage.removeItem('@token');
    navigate('/login', { state: { from: location }, replace: true });
  };
};

export default useLogout;
