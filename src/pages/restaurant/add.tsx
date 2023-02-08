import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import RestaurantForm from '@/components/RestaurantForm';

export default () => {
  return (
    <>
      <RestaurantForm title="New"></RestaurantForm>
      <Link href="/">返回</Link>
    </>
  );
};
