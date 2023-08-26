import React, { useEffect, useRef, useState } from "react";

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

function Avatar({ inputValue, width, height, lightModeColors = { background: "#F8F8F8" }, darkModeColors = { background: "#333" }, darkMode = false, lightModeClass = "", darkModeClass = "" }) {
  const canvasRef = useRef(null);
  const [colors, setColors] = useState({ r: 0, g: 0, b: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const matrixSize = 5;

    const generateMatrix = async () => {
      const hash = await sha256(inputValue);
      const newMatrix = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0));

      for (let i = 0; i < newMatrix.length; i++) {
        for (let j = 0; j < newMatrix[i].length; j++) {
          const n = parseInt(hash.substr(i * j + j, 1), 16);
          newMatrix[i][j] = n > 7 ? 0 : 1;
        }
      }

      for (let i = 0; i < newMatrix.length; i++) {
        for (let j = Math.round(newMatrix[i].length / 2), k = 2; j < newMatrix[i].length; j++, k += 2) {
          newMatrix[i][j] = newMatrix[i][j - k];
        }
      }

      drawMatrix(newMatrix);
    };

    const clearCanvas = () => {
      ctx.fillStyle = darkMode ? darkModeColors.background : lightModeColors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawMatrix = (m) => {
      clearCanvas();

      const colorString = `rgba(${colors.r}, ${colors.g}, ${colors.b}, 1)`;
      ctx.fillStyle = colorString;

      const cellWidth = width / matrixSize;
      const cellHeight = height / matrixSize;

      for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
          if (m[i][j] === 1) {
            ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
          }
        }
      }
    };

    generateMatrix();
  }, [inputValue, colors, width, height, darkModeColors, lightModeColors, darkMode]);

  useEffect(() => {
    const updateColors = async () => {
      const hash = await sha256(inputValue);
      let r = parseInt(hash.substr(0, 2), 16);
      let g = parseInt(hash.substr(2, 2), 16);
      let b = parseInt(hash.substr(4, 2), 16);

      if (darkMode) {
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
      }

      setColors({ r, g, b });
    };

    updateColors();
  }, [inputValue, darkMode]);

  const containerClassName = darkMode ? darkModeClass : lightModeClass;

  return (
      <canvas className={containerClassName} ref={canvasRef} width={width} height={height}></canvas>
  );
}

export default Avatar;
