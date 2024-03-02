'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const user = useAppSelector((state) => state.user);
    const auth = user.id;

    console.log('manaaaaa', auth);

    useEffect(() => {
      if (!auth) {
        return redirect('/');
      }
    }, [auth]);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
