import React from "react";

const LoadingCircle = () => {
	return (
		<div className="flex justify-center items-center h-full flex-grow-1 bg-black ">
			<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 m-auto"></div>
		</div>
	);
};

export default LoadingCircle;