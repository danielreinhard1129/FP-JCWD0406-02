import React from 'react';
import RegisterCard from './components/RegisterCard';

import dynamic from 'next/dynamic';

const RegisterCardDynamic = dynamic(() => import('./components/RegisterCard'), {
  ssr: false,
});
const DetailRegisterPage = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <RegisterCardDynamic />
      </div>
    </div>
  );
};

export default DetailRegisterPage;
