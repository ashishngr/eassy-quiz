import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
const QuizScopeGraph = ({data}) => {

    // Ensure the data is properly formatted
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

    const formattedData = data.map((item, index) => ({
        id: index,
        value: item.count,
        label: item.scope,
      }));
  return (
    <PieChart
    series={[
        {
          data: formattedData,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      width={500}
      height={300}
    />
  )
}

export default QuizScopeGraph