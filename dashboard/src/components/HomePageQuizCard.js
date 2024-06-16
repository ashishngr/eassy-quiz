import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'; 

const HomePageQuizCard = ({heading, nember}) => {
  return (
    <Box display="flex" justifyContent="space-around" padding={1}>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
            <Typography variant="h5" component="div" 
            sx={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'Arial' }}>
                {heading}
            </Typography>
            <Typography variant="h3" component="div" color="primary" sx={{ fontSize: '2.5rem', fontWeight: 'bold' }} >
                {nember}
            </Typography>
            </CardContent>
        </Card>
    </Box>
  )
}

export default HomePageQuizCard