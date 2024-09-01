import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
const QuizScopeGraph = ({data}) => {

    // Ensure the data is properly formatted
  if (!data || data.length === 0) {
    data = [{ scope: 'No Data To Show On The Chart / Please change the filters', count: 0 }];
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