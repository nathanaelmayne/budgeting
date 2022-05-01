import React, { useEffect } from 'react';
import { LineDataPoint } from '../../models/line-data-point.model';
import './LineChart.scss';

interface Props {
  data: LineDataPoint[];
  color?: string;
  svgHeight?: number;
  svgWidth?: number;
}

function LineChart(props: Props) {
  useEffect(() => {
    // adjust x data
  }, []);

  function onlyX() {
    const { data } = props;
    return data.map((obj) => obj.x);
  }

  function onlyY() {
    const { data } = props;
    return data.map((obj) => obj.y);
  }

  function getMinX() {
    return Math.min.apply(null, onlyX());
  }

  function getMinY() {
    return Math.min.apply(null, onlyY());
  }

  function getMaxX() {
    return Math.max.apply(null, onlyX());
  }

  function getMaxY() {
    return Math.max.apply(null, onlyY());
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
    <svg viewBox={`0 0 ${getSvgX(getMaxX())} ${getSvgY(getMinY())}`}>
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
