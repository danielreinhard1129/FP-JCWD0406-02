import { useAppSelector } from '@/lib/hooks';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export const LoginGuard = (Component: any) => {
  return function IsCustomer(props: any) {
    const user = useAppSelector((state) => state.user);
    const userId = user.id;

    if (userId > 0) {
      toast.warning('You Already Login');
      redirect('/');
    } else {
      return <Component {...props} />;
    }
  };
};
