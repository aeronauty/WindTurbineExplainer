import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './App.css';

// Color palette for blades
const BLADE_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#a78bfa', '#fb923c', '#34d399', '#f472b6'];

interface DataPoint {
  theta: number;
  thetaLabel: string;
  [key: string]: number | string;
}

function App() {
  const [numBlades, setNumBlades] = useState(3);
  const [phaseShift, setPhaseShift] = useState(0);
  const [resolution, setResolution] = useState(360);

  // Generate data
  const generateData = (): { sinData: DataPoint[], sin2Data: DataPoint[] } => {
    const sinData: DataPoint[] = [];
    const sin2Data: DataPoint[] = [];

    for (let i = 0; i < resolution; i++) {
      const theta = (2 * Math.PI * i) / resolution;
      const thetaLabel = (theta / Math.PI).toFixed(2) + 'π';

      const sinPoint: DataPoint = { theta, thetaLabel };
      const sin2Point: DataPoint = { theta, thetaLabel };

      let sinSum = 0;
      let sin2Sum = 0;

      for (let b = 0; b < numBlades; b++) {
        const phase = phaseShift + (2 * Math.PI * b) / numBlades;
        const sinValue = Math.sin(theta + phase);
        const sin2Value = Math.pow(Math.sin(theta + phase), 2);

        sinPoint[`blade${b}`] = sinValue;
        sin2Point[`blade${b}`] = sin2Value;

        sinSum += sinValue;
        sin2Sum += sin2Value;
      }

      sinPoint['sum'] = sinSum;
      sin2Point['sum'] = sin2Sum;

      sinData.push(sinPoint);
      sin2Data.push(sin2Point);
    }

    return { sinData, sin2Data };
  };

  const { sinData, sin2Data } = generateData();

  // Custom tick formatter for X axis
  const formatXAxis = (value: number) => {
    const piValue = value / Math.PI;
    if (piValue === 0) return '0';
    if (piValue === 0.5) return 'π/2';
    if (piValue === 1) return 'π';
    if (piValue === 1.5) return '3π/2';
    if (piValue === 2) return '2π';
    return '';
  };

  return (
    <div className="app">
      <div className="container">
        <h1>🌀 Blade Harmonics Visualizer</h1>

        <div className="controls">
          <div className="control-group">
            <label htmlFor="numBlades">Number of Blades (B):</label>
            <input
              type="range"
              id="numBlades"
              min="1"
              max="8"
              value={numBlades}
              onChange={(e) => setNumBlades(parseInt(e.target.value))}
            />
            <span className="value-display">{numBlades}</span>
          </div>

          <div className="control-group">
            <label htmlFor="phaseShift">Phase Shift (Δψ):</label>
            <input
              type="range"
              id="phaseShift"
              min="0"
              max="6.28"
              step="0.01"
              value={phaseShift}
              onChange={(e) => setPhaseShift(parseFloat(e.target.value))}
            />
            <span className="value-display">{phaseShift.toFixed(2)}</span>
          </div>

          <div className="control-group">
            <label htmlFor="resolution">Resolution:</label>
            <input
              type="range"
              id="resolution"
              min="100"
              max="1000"
              step="10"
              value={resolution}
              onChange={(e) => setResolution(parseInt(e.target.value))}
            />
            <span className="value-display">{resolution}</span>
          </div>
        </div>

        <div className="plot-container">
          <div className="plot-title">sin(θ + Δψ + 2πb/B) - Individual Blades and Sum</div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={sinData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="theta" 
                tickFormatter={formatXAxis}
                ticks={[0, Math.PI/2, Math.PI, 3*Math.PI/2, 2*Math.PI]}
                domain={[0, 2 * Math.PI]}
                label={{ value: 'θ (radians)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis label={{ value: 'sin(θ + Δψ + 2πb/B)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                labelFormatter={(value) => `θ = ${(value as number / Math.PI).toFixed(2)}π`}
                formatter={(value: number) => value.toFixed(4)}
              />
              <Legend />
              {Array.from({ length: numBlades }, (_, b) => (
                <Line
                  key={`sin-blade-${b}`}
                  type="monotone"
                  dataKey={`blade${b}`}
                  stroke={BLADE_COLORS[b % BLADE_COLORS.length]}
                  strokeWidth={1.5}
                  dot={false}
                  name={`Blade ${b + 1}`}
                  isAnimationActive={true}
                  animationDuration={500}
                  animationEasing="ease-in-out"
                />
              ))}
              <Line
                type="monotone"
                dataKey="sum"
                stroke="#000000"
                strokeWidth={3}
                dot={false}
                name="Sum"
                isAnimationActive={true}
                animationDuration={500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="plot-container">
          <div className="plot-title">sin²(θ + Δψ + 2πb/B) - Individual Blades and Sum</div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={sin2Data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="theta" 
                tickFormatter={formatXAxis}
                ticks={[0, Math.PI/2, Math.PI, 3*Math.PI/2, 2*Math.PI]}
                domain={[0, 2 * Math.PI]}
                label={{ value: 'θ (radians)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis label={{ value: 'sin²(θ + Δψ + 2πb/B)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                labelFormatter={(value) => `θ = ${(value as number / Math.PI).toFixed(2)}π`}
                formatter={(value: number) => value.toFixed(4)}
              />
              <Legend />
              {Array.from({ length: numBlades }, (_, b) => (
                <Line
                  key={`sin2-blade-${b}`}
                  type="monotone"
                  dataKey={`blade${b}`}
                  stroke={BLADE_COLORS[b % BLADE_COLORS.length]}
                  strokeWidth={1.5}
                  dot={false}
                  name={`Blade ${b + 1}`}
                  isAnimationActive={true}
                  animationDuration={500}
                  animationEasing="ease-in-out"
                />
              ))}
              <Line
                type="monotone"
                dataKey="sum"
                stroke="#000000"
                strokeWidth={3}
                dot={false}
                name="Sum"
                isAnimationActive={true}
                animationDuration={500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="info-box">
          <h3>Theory</h3>
          <p><strong>For sin(θ):</strong> The sum of equally-spaced sinusoids is zero for B ≥ 2. This is due to rotational symmetry and the roots of unity theorem.</p>
          <div className="math">∑[b=0 to B-1] sin(θ + 2πb/B) = 0</div>
          
          <p><strong>For sin²(θ):</strong> Using the identity sin²(x) = (1 - cos(2x))/2, the sum becomes:</p>
          <div className="math">∑[b=0 to B-1] sin²(θ + 2πb/B) = B/2</div>
          
          <p>This explains why you see different behavior: sin harmonics cancel completely, but sin² harmonics average to a constant B/2.</p>
        </div>
      </div>
    </div>
  );
}

export default App;


