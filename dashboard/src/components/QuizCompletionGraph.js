import React from 'react'
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { chartsGridClasses } from '@mui/x-charts/ChartsGrid';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
    yAxis: [{ label: 'Number of Quizzes' }],
    height: 300,
    width: 500
};

const valueFormatter = (value) => `${value} Quizzes`;

const QuizCompletionGraph = ({data}) => {


    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }
    const mapCompletionStatus = (status) => status ? 'Completed' : 'Not Completed';
    // Map the original data to include custom labels for isComplete
    const mappedData = data?.map(item => ({
        ...item,
        isComplete: mapCompletionStatus(item.isComplete),
    }));
   
    const series = [{
        dataKey: 'count',
        label: 'Quizzes',
        valueFormatter,
        color: '#B6D0E2'
    }];

  return (
    <div>
        <BarChart
        dataset={mappedData}
        xAxis={[{ scaleType: 'band', dataKey: 'isComplete', label: 'Completion Status' }]}
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

export default QuizCompletionGraph