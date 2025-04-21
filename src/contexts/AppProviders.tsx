/**
 * 多 Provider 组合进 AppProviders.tsx
   - 放最“外围”的状态管理工具（如 Redux）
   - 中间放异步工具（如 React Query、SWR）
   - 内层放你的 UI 逻辑 Provider（如 Theme, Auth）
 */

import { AuthProvider } from './AuthContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
