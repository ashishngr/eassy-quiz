import React from 'react'
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';
import { BarChart } from '@mui/x-charts/BarChart';


const chartSetting = {
    yAxis: [{ label: 'Number of Users' }],
    height: 300,
    width: 500
};

const valueFormatter = (value) => `${value} Users`;

const QuizFeedBackGraph = ({ratingData}) => {
    
    if (!ratingData || ratingData.length === 0) {
        return <div>No data available</div>;
    }
    if (!ratingData || ratingData.length === 0) {
    return <div>No data available</div>;
    }
    const dateKeys = Object.keys(ratingData[0])?.filter(key => key !== 'rating');
    const series = dateKeys.map(dateKey => ({
        dataKey: dateKey,
        label: dateKey,
        valueFormatter,
    }));

  return (
    <div>
    <BarChart
      dataset={ratingData}
      xAxis={[{ scaleType: 'band', dataKey: 'rating' }]}
      series={series}
      grid={{ horizontal: true }}
      sx={{
        [`& .${axisClasses.left} .${axisClasses.label}`]: {
          transform: 'translateX(-10px)',
        },
        [`& .${chartsGridClasses.line}`]: { strokeDasharray: '5 3', strokeWidth: 1 },
      }}
      {...chartSetting}
    />
    </div>
  )
}
export default QuizFeedBackGraph 