"use client";

/**
 * Spinner Component
 * 
 * A loading indicator component that displays an animated spinner.
 * Used to indicate background processes or loading states.
 * 
 * Features:
 * - Animated loading indicator using Lottie animation
 * - Visibility control through props
 * - Auto-unmounts after a delay to improve performance
 * - Styled overlay that prevents interaction with background content
 * - Configurable animation source from app config
 */
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