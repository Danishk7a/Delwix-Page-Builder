import React, { useState } from 'react';

const GradientGenerator = ({gradientOn}) => {
  const [color1, setColor1] = useState('#ff0000');
  const [color2, setColor2] = useState('#0000ff');
  const [angle, setAngle] = useState(90);

  const gradientStyle = {
    background: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
    width: '100%',
    height: '300px',
    borderRadius: '8px',
    margin: '20px 0',
  };

  return (
    <>
    
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor:'black' }}>
      <h2>Gradient Generator</h2>

      <div style={gradientStyle}></div>

      <div>
        <label>
          Color 1: 
          <input
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      <div style={{ margin: '10px 0' }}>
        <label>
          Color 2: 
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      <div>
        <label>
          Angle (deg): 
          <input
            type="number"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            style={{ marginLeft: '10px', width: '60px' }}
          />
        </label>
      </div>
      <button onClick={gradientOn}>close</button>

      <div style={{ marginTop: '20px' }}>
        <h4>CSS Code:</h4>
        <pre>{`background: linear-gradient(${angle}deg, ${color1}, ${color2});`}</pre>
      </div>
    </div>
 
    
    </>
  );
};

export default GradientGenerator;
