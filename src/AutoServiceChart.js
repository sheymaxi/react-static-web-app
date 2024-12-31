import React from 'react';
import PropTypes from 'prop-types';

const AutoServiceChart = ({ data, type, title }) => {
  const ChartComponent = () => {
    switch (type) {
      case 'line':
        return <div>Line Chart Placeholder</div>;
      case 'bar':
        return <div>Bar Chart Placeholder</div>;
      case 'pie':
        return <div>Pie Chart Placeholder</div>;
      default:
        return <div>No visualization available</div>;
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
      <h3>{title}</h3>
      {data && data.length > 0 ? (
        <ChartComponent />
      ) : (
        <div>No data available for visualization</div>
      )}
    </div>
  );
};

AutoServiceChart.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['line', 'bar', 'pie']).isRequired,
  title: PropTypes.string.isRequired,
};

AutoServiceChart.defaultProps = {
  data: [],
  title: 'Default Chart Title',
};

export default AutoServiceChart;
