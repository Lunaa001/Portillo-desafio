import { useState, useEffect } from 'react';
import './ElevationChart.css';

const ElevationChart = ({ distance, data, maxElevation, minElevation }) => {
  const [runnerPosition, setRunnerPosition] = useState(0);

  const width = 500;
  const height = 370;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const speed = distance === 28 ? 0.08 : 0.15;
  const interval = distance === 28 ? 250 : 200;

  const points = data.map((point, index) => {
    const x = padding.left + (index / (data.length - 1)) * chartWidth;
    const normalizedY = (point.elevation - minElevation) / (maxElevation - minElevation);
    const y = padding.top + chartHeight - (normalizedY * chartHeight);
    return { x, y, elevation: point.elevation, km: point.km };
  });

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setRunnerPosition((prev) => {
        if (prev >= points.length - 1) return 0;
        return prev + speed;
      });
    }, interval);

    return () => clearInterval(animationInterval);
  }, [points.length, speed, interval]);

  const runnerIndex = Math.floor(runnerPosition);
  const nextIndex = Math.min(runnerIndex + 1, points.length - 1);
  const progress = runnerPosition - runnerIndex;

  const runnerX = points[runnerIndex].x + (points[nextIndex].x - points[runnerIndex].x) * progress;
  const runnerY = points[runnerIndex].y + (points[nextIndex].y - points[runnerIndex].y) * progress - 15;

  const areaPath = `
    M ${padding.left},${height - padding.bottom}
    L ${points.map(p => `${p.x},${p.y}`).join(' L ')}
    L ${width - padding.right},${height - padding.bottom}
    Z
  `;

  const gridLines = [];
  const ySteps = 5;
  for (let i = 0; i <= ySteps; i++) {
    const y = padding.top + (chartHeight / ySteps) * i;
    const elevation = Math.round(maxElevation - ((maxElevation - minElevation) / ySteps) * i);
    gridLines.push({ y, elevation });
  }

  const xSteps = Math.ceil(distance / 2);
  const xGridLines = [];
  for (let i = 0; i <= xSteps; i++) {
    const x = padding.left + (chartWidth / xSteps) * i;
    const km = Math.round((distance / xSteps) * i);
    xGridLines.push({ x, km });
  }

  return (
    <div className="elevation-chart">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <g className="grid">
          {gridLines.map((line, i) => (
            <g key={`y-${i}`}>
              <line
                x1={padding.left}
                y1={line.y}
                x2={width - padding.right}
                y2={line.y}
                stroke="rgba(80, 80, 80, 0.4)"
                strokeWidth="1"
              />
              <text
                x={padding.left - 10}
                y={line.y + 4}
                textAnchor="end"
                fill="rgba(200, 200, 200, 0.8)"
                fontSize="11"
                fontFamily="monospace"
              >
                {line.elevation}
              </text>
            </g>
          ))}
          {xGridLines.map((line, i) => (
            <g key={`x-${i}`}>
              <line
                x1={line.x}
                y1={padding.top}
                x2={line.x}
                y2={height - padding.bottom}
                stroke="rgba(80, 80, 80, 0.4)"
                strokeWidth="1"
              />
              <text
                x={line.x}
                y={height - padding.bottom + 20}
                textAnchor="middle"
                fill="rgba(200, 200, 200, 0.8)"
                fontSize="11"
                fontFamily="monospace"
              >
                {line.km} km
              </text>
            </g>
          ))}
        </g>

        <path
          d={areaPath}
          fill="rgba(100, 100, 100, 0.9)"
          stroke="none"
        />

        <polyline
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="rgba(140, 140, 140, 1)"
          strokeWidth="2"
        />

        <text
          x={padding.left - 20}
          y={padding.top - 5}
          textAnchor="middle"
          fill="rgba(200, 200, 200, 0.9)"
          fontSize="13"
          fontWeight="bold"
          fontFamily="monospace"
        >
          m
        </text>

        <circle
          cx={runnerX}
          cy={runnerY + 15}
          r="2"
          fill="rgba(255, 215, 0, 0.3)"
          className="runner-trail"
        />

        <g transform={`translate(${runnerX}, ${runnerY})`}>
          <ellipse cx="0" cy="22" rx="8" ry="3" fill="rgba(0, 0, 0, 0.3)" />
          <g className="runner-body running">
            <circle cx="0" cy="0" r="4" fill="#FFD700" />
            <line x1="0" y1="4" x2="0" y2="12" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="6" x2="-4" y2="10" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" className="arm-left">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="-30 0 6" to="30 0 6" dur="0.8s" repeatCount="indefinite" additive="sum" />
            </line>
            <line x1="0" y1="6" x2="4" y2="10" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" className="arm-right">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="30 0 6" to="-30 0 6" dur="0.8s" repeatCount="indefinite" additive="sum" />
            </line>
            <line x1="0" y1="12" x2="-3" y2="18" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" className="leg-left">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="25 0 12" to="-25 0 12" dur="0.8s" repeatCount="indefinite" additive="sum" />
            </line>
            <line x1="0" y1="12" x2="3" y2="18" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" className="leg-right">
              <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="-25 0 12" to="25 0 12" dur="0.8s" repeatCount="indefinite" additive="sum" />
            </line>
          </g>
        </g>

        <text
          x={runnerX}
          y={runnerY - 10}
          textAnchor="middle"
          fill="#FFD700"
          fontSize="10"
          fontWeight="bold"
          className="runner-km"
        >
          {Math.round(points[runnerIndex].km)}km
        </text>
      </svg>
    </div>
  );
};

export default ElevationChart;
