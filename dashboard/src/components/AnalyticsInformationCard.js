import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'; 
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


const AnalyticsInformationCard = ({heading, data}) => {
  return (
    <Box 
    sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 200,
          height: 150,
        },
      }}
    >
     <Paper elevation={3} square={false}>
        <Typography variant='h6' sx={{ fontWeight: 'bold', fontFamily: 'Monospace', color: 'primary.main' }}>
            {heading}
        </Typography>
        <Divider />
        <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%', 
      }}
    >
      <Typography 
        variant='h3'  
        sx={{ 
          fontWeight: 'bold', 
          fontFamily: 'Monospace', 
          color: 'primary.main', 
          textAlign: 'center'
        }}
      >
        {data}
      </Typography>
    </Box>

     </Paper>
    </Box>
  )
}

export default AnalyticsInformationCard