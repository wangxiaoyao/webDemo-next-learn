import  { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export function AuthProvider(){
  const [username, setUsername] = useState('wangxiaoyao');

  return <AuthContext.Provider value={{username}}> {children} </AuthContext.Provider>
};

export const useAuth = () => {
  const data = useContext(authProvider());
  return data;
};

