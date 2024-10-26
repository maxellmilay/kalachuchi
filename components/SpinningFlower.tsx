'use client'

// components/SpinningFlower.js
import React, { useEffect, useState } from 'react';

const SpinningFlower = () => {
  // ASCII characters to represent different parts and depths of the flower
  const chars = ['.', '*', 'o', 'O', '@', '🌸'];
  const [output, setOutput] = useState("");

  const renderFlower = () => {
    const rows = 20; // Vertical size
    const cols = 40; // Horizontal size
    const baseRadius = 10; // Base radius for the round effect

    let result = "";

    // Use time to create a dynamic rotation effect
    const t = Date.now() / 1000;

    for (let y = 0; y < rows; y++) {
      let row = "";
      // Calculate a dynamic radius based on row position to create vertical compression
      const dynamicRadius = baseRadius * (1 - Math.abs(y - rows / 2) / (rows / 2));
      
      for (let x = 0; x < cols; x++) {
        // Apply the dynamic radius in the x position calculation for rounding effect
        const xPos = (x - cols / 2) / dynamicRadius;
        const yPos = (y - rows / 2) / baseRadius;

        // Calculate spherical distance from the center
        const distance = Math.sqrt(xPos * xPos + yPos * yPos);

        // Create a round shape with sin/cos transformations
        const angle = Math.atan2(yPos, xPos) + t;
        const depthEffect = Math.sin(distance * 2 - angle * 3);

        // Map distance and depth to ASCII characters, keeping index in bounds
        let charIndex = Math.floor((depthEffect + 1) * (chars.length / 2));
        charIndex = Math.max(0, Math.min(chars.length - 1, charIndex)); // Ensures within bounds

        // Use modulo to cycle through the ASCII character array
        row += chars[charIndex];
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
