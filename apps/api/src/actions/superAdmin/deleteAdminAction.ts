import { deleteAdmin } from '@/repositories/superAdmin/deleteAdmin';

export const deleteAdminAction = async (id: number) => {
  try {
    const admin = await deleteAdmin(id);

    return {
      message: 'Success delete admin',
      data: admin,
    };
  } catch (error) {
    throw error;
  }
};
