import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const HOME = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/main');
  }, []);

  return (
    <>
      <div>Loading...</div>
    </>
  );
};

export default HOME;
