import React, { useEffect } from "react";
import icon from "./Attention.svg";

import "./modal.scss";
import ReactDOM from "react-dom";

type TProps = {
  showHandler: () => void;
  deleteHandler: () => void;
  showModal: boolean;
};

const Modal: React.FC<TProps> = ({ showModal, showHandler, deleteHandler }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      let key = event.key;
      if (key === "Escape") {
        event.stopPropagation();
        showHandler();
      }
    };
    window.addEventListener("keyup", handleEscape);
    return () => {
      window.removeEventListener("keyup", handleEscape);
    };
  }, [showHandler]);

  if (!showModal) return null;

  return ReactDOM.createPortal(
    <>
      <div className="wrap" onClick={showHandler}></div>
      <div className="modal" role="alertdialog" aria-modal="true">
        <div className="modal__info">
          <div className="modal__icon">
            <img src={icon} alt="attention-icon" />
          </div>
          <p>Are you sure to delete this article?</p>
        </div>
        <div className="modal__btns">
          <button autoFocus className="modal__btn" onClick={showHandler}>
            No
          </button>
          <button
            className="modal__btn"
            onClick={deleteHandler}
            aria-controls="notes"
          >
            Yes
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")!
  );
};

export default Modal;
