import React from 'react';
import ResetPasswordCard from './components/ResetPasswordCard';
import dynamic from 'next/dynamic';

const ResetPasswordCardDynamic = dynamic(
  () => import('./components/ResetPasswordCard'),
  { ssr: false }, // This will disable server-side rendering for ResetPasswordCard
);
const ResetPassword = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <ResetPasswordCardDynamic />
    </div>
  );
};

export default ResetPassword;
