import { useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { redirect, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  roleId: number;
  profile_picture: string;
  first_name: string;
  last_name: string;
}
export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const user = useAppSelector((state) => state.user.id);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        return redirect('/');
      }
    }, [user]);

    if (user) {
      return null;
    }
    return <Component {...props} />;
  };
}
