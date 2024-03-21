import { useAppSelector } from '@/lib/hooks';
import { redirect } from 'next/navigation';

export const AuthGuard = (Component: any) => {
  return function IsCustomer(props: any) {
    const role = useAppSelector((state) => state.user.roleId);

    if (role === 1) {
      return redirect('/');
    }
    if (role === 2) {
      return redirect('/promoters');
    }

    return <Component {...props} />;
  };
};
