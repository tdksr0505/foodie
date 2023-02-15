import { LoadingContext } from '../context/loadingContext';
import { useContext } from 'react';

export const useLoading = () => useContext(LoadingContext);
