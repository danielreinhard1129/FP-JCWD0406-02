import dynamic from 'next/dynamic';

const VerificationRegister = dynamic(
  () => import('./components/VerificationRegister'),
  { ssr: false },
);
const Verification = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="relative h-fit md:h-screen">
        <VerificationRegister />
      </div>
    </div>
  );
};

export default Verification;
