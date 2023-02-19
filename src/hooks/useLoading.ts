import { LoadingContext } from '../context/loadingContext';
import { useContext } from 'react';

const useLoading = () => useContext(LoadingContext);
export default useLoading;
