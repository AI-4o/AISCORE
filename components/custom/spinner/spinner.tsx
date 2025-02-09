"use client";

import React, { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./style.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const Spinner: React.FC<{ src: string; children: React.ReactNode }> = ({
  src,
  children,
}) => {
  const isActive = useSelector((state: RootState) => state.spinner.isActive);

  const [render, setRender] = useState(false);

  useEffect(() => {
    if (isActive) {
      setRender(true);
    }
    if (!isActive) {
      setTimeout(() => {
        setRender(false);
      }, 1000);
    }
  }, [isActive]);

  return (
    <>
      {render && (
        <div className="spinner-container">
          <div className={`spinner ${isActive ? "visible" : "hidden"}`}>
            <div className="spinner-content">
              <div className="spinner-icon">
                <DotLottieReact src={src} loop autoplay />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={`spinner-sibling-content ${isActive ? "disabled" : ""}`}>
        {children}
      </div>
    </>
  );
};

export default Spinner;
