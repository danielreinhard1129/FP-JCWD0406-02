import dynamic from 'next/dynamic';

const VerificationUser = dynamic(
  () => import('./components/VerificationUser'),
  { ssr: false },
);

const VerificationPageUser = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="relative h-fit md:h-screen">
        <VerificationUser />
      </div>
    </div>
  );
};

export default VerificationPageUser;
