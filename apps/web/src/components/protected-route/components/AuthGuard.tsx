import { useAppSelector } from '@/lib/hooks';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export const AuthGuard = (Component: any) => {
  return function IsCustomer(props: any) {
    const user = useAppSelector((state) => state.user);
    const role = user.roleId;

    if (role === 2) {
      toast.warning('You Have Not Access');
      return redirect(`/admin`);
    }
    if (role === 3) {
      toast.warning('You Have Not Access');
      return redirect('/');
    }
    // if (user.id === 0) {
    //   toast.warning('You Have to Login First');
    //   return redirect(`/login`);
    // }
    return <Component {...props} />;
  };
};
