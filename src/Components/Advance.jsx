import React, { useEffect, useRef } from 'react';
import ThreeScene from './ThreeD/ThreeScene';

const Advance = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Clear the content of the body element
    const bodyElement = document.body;
    while (bodyElement.firstChild) {
      bodyElement.removeChild(bodyElement.firstChild);
    }

    // Append the container div to the body
    if (containerRef.current) {
      document.body.appendChild(containerRef.current);
    }

    // Cleanup function
    return () => {
      if (containerRef.current && containerRef.current.parentNode === document.body) {
        document.body.removeChild(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh' }}>
      <ThreeScene />
    </div>

  )
}


export default Advance