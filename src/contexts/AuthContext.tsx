'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  username: string;
  setUsername: (val: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  username: '',
  setUsername: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // 这里命名为：_setUsername
  const [username, _setUsername] = useState('wangxiaoyao');

  // 封装对外接口
  const setUsername = (val: string) => {
    // 其他逻辑
    _setUsername(val);
  };

  useEffect(() => {
    console.log('context useEffect info');
  }, []);

  return (
    // 关键字value
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context.username) {
    throw Error('context has no username data');
  }
  return context;
};
