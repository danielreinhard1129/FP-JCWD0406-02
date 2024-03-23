import { useAppSelector } from '@/lib/hooks';
import { redirect, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const CustomerGuard = (Component: any) => {
  return function IsCustomer(props: any) {
    const user = useAppSelector((state) => state.user);
    const role = user.roleId;

    if (role === 3) {
      toast.warning('You Have Not Access');
      redirect('/');
    }
    // if (user.id === 0) {
    //   toast.warning('You Have Not Access');
    //   return redirect(``);
    // }
    return <Component {...props} />;
  };
};
