import React from "react";
import icon from "../../img/Attention.svg";
import cn from "classnames";
import "./modal.scss";

type TProps = {
  showHandler: () => void;
  deleteHandler: () => void;
  showModal: boolean;
};
const Modal: React.FC<TProps> = ({ showHandler, deleteHandler, showModal }) => {
  return (
    <div className={cn("modal", { "modal--show": showModal })}>
      <div className="arrow"></div>
      <div className="modal__info">
        <div className="modal__icon">
          <img src={icon} alt="attention-icon" />
        </div>
        <p>Are you sure to delete this article?</p>
      </div>
      <div className="modal__btns">
        <button className="modal__btn" onClick={showHandler}>
          No
        </button>
        <button className="modal__btn" onClick={deleteHandler}>
          Yes
        </button>
      </div>
    </div>
  );
};

export default Modal;
