'use client';
import { useAuth } from '@/contexts';

const AuthContextChild = () => {
  const contextVal = useAuth();
  console.log(contextVal, 'contextVal');
  return (
    <div>
      <p>AuthContextChild: {contextVal.username}</p>
    </div>
  );
};

export default AuthContextChild;
