import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.JSX';

const useAuth = () => {
  const authInfo = useContext(AuthContext)
  return authInfo;

};

export default useAuth;