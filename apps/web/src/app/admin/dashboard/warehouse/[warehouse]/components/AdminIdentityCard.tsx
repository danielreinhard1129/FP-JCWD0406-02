import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

interface Admin {
  id: number;
  name: string;
  role: string;
  email: string;
  contact: string;
  photoUrl: string;
}

// Sample admin data
const admin: Admin = {
  id: 1,
  name: 'Jordy Repi',
  role: 'Warehouse Admin',
  email: 'jordyrepi@example.com',
  contact: '+62 890 987 654',
  photoUrl: '/avatar.webp', // Placeholder or actual photo URL
};

const AdminIdentityCard: React.FC = () => {
  return (
    <div>
      <div className="relative flex items-center bg-white shadow-lg rounded-xl pr-4">
        <img
          src={admin.photoUrl}
          alt="Admin"
          className="object-cover rounded-l-xl w-40 "
        />
        <div className="pl-4 flex flex-col justify-between flex-grow">
          <div className="gap-2 items-center">
            <h2 className="text-lg font-medium">{admin.name}</h2>
            <p className="text-sm text-gray-500">{admin.role}</p>
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <FaEnvelope className="mr-2" />
            {admin.email}
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <FaPhone className="mr-2" />
            {admin.contact}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminIdentityCard;
