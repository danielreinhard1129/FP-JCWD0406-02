import { useAppSelector } from '@/lib/hooks';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const NotLoginGuard = (Component: any) => {
  return function IsCustomer(props: any) {
    const user = useAppSelector((state) => state.user);
    const userId = user.id;

    if (!userId) {
      toast.warning('You Need to Login First');
      redirect('/');
    }
    return <Component {...props} />;
  };
};
