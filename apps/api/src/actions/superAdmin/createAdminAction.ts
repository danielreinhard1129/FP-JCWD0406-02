import { createAdmin } from '@/repositories/superAdmin/createAdmin';

export const createAdminAction = async (id: number) => {
  try {
    // console.log('actionnnnn', id);

    const admin = await createAdmin(id);

    return {
      message: 'Success Change role user to Admin',
      data: admin,
    };
  } catch (error) {
    throw error;
  }
};
