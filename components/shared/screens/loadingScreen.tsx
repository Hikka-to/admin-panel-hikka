import React from 'react'

const LoadingScreen = () => {
 return (
    <div className="flex justify-center items-center h-full flex-grow bg-black ">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
 );
};

export default LoadingScreen;
