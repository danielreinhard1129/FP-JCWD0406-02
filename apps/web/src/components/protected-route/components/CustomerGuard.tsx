import { useAppSelector } from '@/lib/hooks';
import { redirect, useRouter } from 'next/navigation';

export const CustomerGuard = (Component: any) => {
  return function IsCustomer(props: any) {
    const role = useAppSelector((state) => state.user.roleId);

    if (role === 3) {
      redirect('/');
    } else {
      return <Component {...props} />;
    }
  };
};
