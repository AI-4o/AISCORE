"use client";

import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./style.css";
import { config } from "appConfig";
export const Spinner = ({ isActive }: { isActive: boolean }) => {

  const [render, setRender] = useState(false);

  setTimeout(() => setRender(false), 1000);


  return (
    <>
      {render && (
        <div className="spinner-container">
          <div className={`spinner ${isActive ? "visible" : "hidden"}`}>
            <div className="spinner-content">
              <div className="spinner-icon">
                <DotLottieReact src={config.spinner} loop autoplay />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};