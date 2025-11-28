"use client";

import React from "react";
import { externalInput } from "./externalInput";

// --- MOVER PARA CIMA (antes de usar)
const btnStyle: React.CSSProperties = {
  pointerEvents: "auto",
  borderRadius: "50%",
  border: "1px solid #ccc",
  background: "rgba(255,255,255,0.2)",
  color: "#000",
  fontSize: "24px",
  fontWeight: "bold",
  backdropFilter: "blur(4px)",
};
// -----------------------------------

export function VirtualArrows() {
  function setDirection(dir: keyof typeof externalInput, value: boolean) {
    externalInput[dir] = value;
  }

  function makeHandlers(dir: keyof typeof externalInput) {
    return {
      onMouseDown: () => setDirection(dir, true),
      onMouseUp: () => setDirection(dir, false),
      onMouseLeave: () => setDirection(dir, false),
      onTouchStart: (e: React.TouchEvent) => {
        e.preventDefault();
        setDirection(dir, true);
      },
      onTouchEnd: (e: React.TouchEvent) => {
        e.preventDefault();
        setDirection(dir, false);
      },
      onTouchCancel: (e: React.TouchEvent) => {
        e.preventDefault();
        setDirection(dir, false);
      },
    };
  }

  return (
    <div
      style={{
        position: "relative",
        // bottom: 20,
        // left: 20,
        display: "grid",
        gridTemplateColumns: "60px 60px 60px",
        gridTemplateRows: "60px 60px 60px",
        gap: "4px",
        pointerEvents: "none",
        userSelect: "none"
      }}
    >
      <div />
      <button {...makeHandlers("up")} style={btnStyle}>↑</button>
      <div />

      <button {...makeHandlers("left")} style={btnStyle}>←</button>
      <div />
      <button {...makeHandlers("right")} style={btnStyle}>→</button>

      <div />
      <button {...makeHandlers("down")} style={btnStyle}>↓</button>
      <div />
    </div>
  );
}
