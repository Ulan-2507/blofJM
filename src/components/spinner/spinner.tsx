import React from "react";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import "./spinner.scss";

const Spinner: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.articles);
  if (isLoading) {
    return (
      <div className="loader">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  return null;
};

export default Spinner;
