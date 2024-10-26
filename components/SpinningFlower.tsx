'use client'
// components/SpinningFlower.js
import React, { useEffect, useState } from 'react';

const SpinningFlower = () => {
  // ASCII characters to represent different parts and depths of the flower
  const chars = ['.', '*', 'o', 'O', '@', '🌸'];
  const [output, setOutput] = useState("");

  const renderFlower = () => {
    const rows = 20; // Adjust this for vertical size
    const cols = 40; // Adjust this for horizontal size
    const radius = 10; // Radius to create a rounder shape

    let result = "";

    // Use time to create a dynamic rotation effect
    const t = Date.now() / 1000;

    for (let y = 0; y < rows; y++) {
      let row = "";
      for (let x = 0; x < cols; x++) {
        // Center coordinates
        const xPos = (x - cols / 2) / radius;
        const yPos = (y - rows / 2) / radius;

        // Calculate spherical distance from the center
        const distance = Math.sqrt(xPos * xPos + yPos * yPos);

        // Create a round shape with sin/cos transformations
        const angle = Math.atan2(yPos, xPos) + t;
        const depthEffect = Math.sin(distance * 2 - angle * 3);

        // Map distance and depth to ASCII characters
        const charIndex = Math.floor(
          (depthEffect + 1) * (chars.length / 2)
        );

        // Use modulo to cycle through the ASCII character array
        row += chars[charIndex % chars.length];
      }
      result += row + "\n"; // Add a newline at the end of each row
    }

    setOutput(result);
  };

  useEffect(() => {
    // Set up an interval to update the ASCII flower output dynamically
    const interval = setInterval(renderFlower, 50);
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="flower-container">
      <pre className="flower-text">{output}</pre>
      <style jsx>{`
        .flower-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: monospace;
          color: #ff4081; /* Flower color */
          background-color: #1A1A1A; /* Dark background for contrast */
          white-space: pre;
          font-size: 12px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default SpinningFlower;
