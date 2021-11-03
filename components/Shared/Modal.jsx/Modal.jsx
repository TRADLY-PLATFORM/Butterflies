import React from 'react';

const Modal = ({children}) => {
    return (
		<div className=" fixed top-0 left-0 right-0 w-screen h-screen  bg-secondary bg-opacity-[20%] z-[400] flex justify-center items-center overflow-scroll">
			<div>{children}</div>
		</div>
    );
};

export default Modal;