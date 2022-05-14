import { useSetRecoilState } from 'recoil';

import { JWTTokenState } from '@src/recoils';

const useLogout = () => {
  const setJWTToken = useSetRecoilState(JWTTokenState);

  return () => {
    localStorage.removeItem('@token');
    localStorage.removeItem('@refreshToken');
    sessionStorage.removeItem('@token');
    setJWTToken(null);
  };
};

export default useLogout;
