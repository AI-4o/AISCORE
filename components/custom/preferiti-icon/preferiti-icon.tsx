"use client";
/**
 * PreferitiButton Component
 * 
 * A toggleable star button component used to mark items as favorites.
 * Displays a filled or outlined star icon based on the selected state.
 * 
 * Features:
 * - Toggle between selected/unselected states
 * - Hover effects for better user interaction
 * - Callback support for parent components
 * - Controlled or uncontrolled usage
 * - Maintains internal state while syncing with external state
 */
import { StarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import "./style.css";

export default function PreferitiButton({
  selected,
  onSelected,
}: {
  selected?: boolean;
  onSelected?: (selected: boolean) => void;
}) {
  const [_selected, setSelected] = useState(selected ?? false);
  const [hover, setHover] = useState(false);

  const _onSelected = () => {
    setSelected(!_selected);
    selected = _selected;
    onSelected?.(_selected);
  };

  useEffect(() => {
    if (selected !== _selected) setSelected(selected ?? false);
  }, [selected]);

  return (
    <button className="preferiti-btn" onClick={_onSelected}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "inline-block",
          borderRadius: "50%",
          padding: "5px",
          transition: "background-color 0.3s",
          backgroundColor: hover ? "rgba(255, 255, 0, 0.2)" : "transparent",
        }}
      >
        <StarIcon
          color={selected ? "yellow" : "currentColor"}
          fill={selected ? "yellow" : "none"}
        />
      </div>
    </button>
  );
}
