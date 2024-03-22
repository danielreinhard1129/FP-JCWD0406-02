import { useAppSelector } from '@/lib/hooks';
import { redirect } from 'next/navigation';

export const AuthGuard = (Component: any) => {
  return function IsCustomer(props: any) {
    const role = useAppSelector((state) => state.user.roleId);

    if (role === 2) {
      return redirect('/user');
    }
    if (role === 3) {
      return redirect('/');
    }

    return <Component {...props} />;
  };
};
