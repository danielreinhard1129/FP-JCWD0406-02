import React, { useState, useEffect } from 'react';
import { Spinner } from 'flowbite-react';

function Loading(component: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  // Simulate data fetching
  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout>;
    setIsLoading(true);

    // Set a delay for the spinner to avoid it flashing briefly on the screen
    const spinnerDelay = 500; // 500ms delay
    timer1 = setTimeout(() => {
      if (isLoading) {
        setShowSpinner(true);
      }
    }, spinnerDelay);

    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSpinner(false);
    }, 3000); // Assuming the API call takes 3 seconds

    // Cleanup the timer on component unmount
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      <div className="text-center">
        {showSpinner && <Spinner aria-label="Center-aligned spinner example" />}
      </div>
      {!isLoading && (
        <div>
          {/* Your content after loading goes here */}
          Content loaded!
        </div>
      )}
    </div>
  );
}

export default Loading;
