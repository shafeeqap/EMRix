import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_COMPONENTS } from "./ModalRegistry";
import { closeModal } from "./modalSlice";

const GlobalModal = () => {
  const dispatch = useDispatch();
  const { isOpen, modalType, modalProps } = useSelector((state) => state.modal);

  if (!isOpen && !modalType) return null;

  const Component = MODAL_COMPONENTS[modalType];

  if (!Component) return null;

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        {/* Overlay */}
        <div
          onClick={() => dispatch(closeModal())}
          className="absolute inset-0 bg-black bg-opacity-50"
        />
        {/* Modal Content */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        >
          <Component {...modalProps} />
        </div>
      </div>
    </>
  );
};

export default GlobalModal;
