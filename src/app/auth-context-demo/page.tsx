'use client';
import AuthContextChild from './AuthContextChild';
import { AppProviders } from '@/contexts';

export default function Page() {
  return (
    <>
      {/* <AuthContext.Provider value={'hello'}> */}
      <AppProviders>
        <div className="w-2" id="123"></div>
        <div>auth-context-demo123</div>
        <AuthContextChild />
      </AppProviders>
      {/* </AuthContext.Provider> */}
    </>
  );
}
