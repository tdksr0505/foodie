import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import RestaurantForm from '@/components/RestaurantForm';
import ConfigContext from '@/context/ConfigContext';

export default () => {
  const config = useContext(ConfigContext);
  console.log(`config-${config}`);

  return (
    <>
      <RestaurantForm title="New"></RestaurantForm>
      <Link href="/">返回</Link>
    </>
  );
};
