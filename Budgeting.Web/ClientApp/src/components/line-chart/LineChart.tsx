import React from 'react';
import './LineChart.scss';

interface Props {
  data: { x: number; y: number }[];
  color?: string;
  svgHeight?: number;
  svgWidth?: number;
}

function LineChart(props: Props) {
  function getMinX() {
    const { data } = props;
    const onlyX = data.map((obj) => obj.x);
    const minX = Math.min.apply(null, onlyX);
    return minX;
  }

  function getMinY() {
    const { data } = props;
    const onlyY = data.map((obj) => obj.y);
    const minY = Math.min.apply(null, onlyY);
    return minY;
  }

  function getMaxX() {
    const { data } = props;
    const onlyX = data.map((obj) => obj.x);
    const maxX = Math.max.apply(null, onlyX);
    return maxX;
  }

  function getMaxY() {
    const { data } = props;
    const onlyY = data.map((obj) => obj.y);
    const maxY = Math.max.apply(null, onlyY);
    return maxY;
  }

  function getSvgX(x: number) {
    const { svgWidth } = props;
    return (x / getMaxX()) * (svgWidth || 600);
  }

  function getSvgY(y: number) {
    const { svgHeight } = props;
    return (svgHeight || 200) - (y / getMaxY()) * (svgHeight || 200);
  }

  function makePath() {
    const { data, color } = props;
    let pathD = ` M  ${getSvgX(data[0].x)} ${getSvgY(data[0].y)} `;

    pathD += data.map((point) => `L ${getSvgX(point.x)} ${getSvgY(point.y)}  `);

    return <path className="linechart_path" d={pathD} style={{ stroke: color }} />;
  }

  function makeAxis() {
    const minX = getMinX();
    const maxX = getMaxX();
    const minY = getMinY();
    const maxY = getMaxY();
    return (
      <g className="linechart_axis">
        <line x1={getSvgX(minX)} y1={getSvgY(minY)} x2={getSvgX(maxX)} y2={getSvgY(minY)} />
        <line x1={getSvgX(minX)} y1={getSvgY(minY)} x2={getSvgX(minX)} y2={getSvgY(maxY)} />
      </g>
    );
  }

  return (
    <svg viewBox={`0 0 ${600} ${200}`}>
      {makePath()}
      {makeAxis()}
    </svg>
  );
}

LineChart.defaultProps = {
  color: '#ff4500',
  svgHeight: 200,
  svgWidth: 600,
};

export default LineChart;
