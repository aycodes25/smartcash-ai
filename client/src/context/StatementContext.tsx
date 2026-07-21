import React, { createContext, useContext, useState } from 'react';
import type { ParseResponse } from '../types';

interface StatementContextType {
  data: ParseResponse | null;
  uploadedFileName: string | null;
  isLoading: boolean;
  error: string | null;
  setStatementData: (data: ParseResponse, fileName: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const StatementContext = createContext<StatementContextType | undefined>(undefined);

export const StatementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ParseResponse | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setStatementData = (parsedData: ParseResponse, fileName: string) => {
    setData(parsedData);
    setUploadedFileName(fileName);
    setError(null);
  };

  const reset = () => {
    setData(null);
    setUploadedFileName(null);
    setIsLoading(false);
    setError(null);
  };

  return (
    <StatementContext.Provider
      value={{
        data,
        uploadedFileName,
        isLoading,
        error,
        setStatementData,
        setIsLoading,
        setError,
        reset
      }}
    >
      {children}
    </StatementContext.Provider>
  );
};

export const useStatement = () => {
  const context = useContext(StatementContext);
  if (!context) {
    throw new Error('useStatement must be used within a StatementProvider');
  }
  return context;
};
