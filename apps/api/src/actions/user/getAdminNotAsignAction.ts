import { getAdminNotAssignedRepository } from '@/repositories/user/getAdminNotAsign';

export const getAdminNotAssignedAction = async () => {
  try {
    const admins = await getAdminNotAssignedRepository();
    return {
      message: 'Successfully fetched unassigned admins',
      data: admins,
    };
  } catch (error) {
    throw error;
  }
};
