import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

interface IAppProvider {
  children?: React.ReactNode;
}

const AppProvider: React.FC = ({ children }: IAppProvider) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
