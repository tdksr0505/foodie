import React, { createContext, useState } from 'react';
import { TChildren } from '@/type';
import Loading from '../components/Loading';

const contextDefaultValue = {
  setLoading: (show: boolean) => {},
};

export const LoadingContext = createContext(contextDefaultValue);
export const LoadingProvider = ({ children }: TChildren) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const providerValue = {
    setLoading,
  };
  return (
    <LoadingContext.Provider value={providerValue}>
      {children}
      {isLoading && <Loading />}
    </LoadingContext.Provider>
  );
};
