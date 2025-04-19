import { Children, createContext, useContext } from 'react';

const authContext = createContext(undefined);

const authProvider = () => {
  return <AuthContext.Provider>{ Children } </>
};

const useAuth = () => {
  const data =  useContext(authProvider);
  return data;
};
