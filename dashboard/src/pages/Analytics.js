import React, {useState, useEffect} from 'react'; 
import API from '../common/apis';

import axios from 'axios'; 

import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  List, 
  ListItem, 
  ListItemText, 
  Popover

} from '@mui/material';
import QuizFeedBackGraph from '../components/QuizFeedBackGraph';

const Analytics = () => {
  const [filter, setFilter] = useState('today');
  const [anchorEl, setAnchorEl] = useState(null); 
  const [ratingData, setRatingData] = useState([])
  const handleClick = (event) => {
    // Ensure the event object is passed correctly
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isPopoverOpen = Boolean(anchorEl);
  const handleFilterChange = (filterValue) => {
    const selectedFilter = filterValue;
    setFilter(selectedFilter);
    //triggere API call based on 
    fetchQuizRatingsData(selectedFilter);
  };
  const fetchQuizRatingsData = async(filter) =>{
    try {
    const response = await API.getQuizParticipationRating(filter);
    console.log("response rating data",response)
    if(response.status === 200){
      setRatingData(response.data)
    }
    } catch (error) {
      console.log(error)
    }
  }; 
  useEffect(()=>{
    fetchQuizRatingsData('today')
  },[]); 

  return (
    <div>
    <Box sx={{ textAlign: 'center', mt: 1 }}>
      {/* Main Heading */}
      <Typography variant="h3" gutterBottom>
        Analytics
      </Typography>

      {/* Search by Filter and More Filter Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mt: 2 }}>
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Search by Filter</InputLabel>
          <Select
            value={filter}
            onChange={handleFilterChange}
            label="Search by Filter"
          >
            <MenuItem value="latest">
            <Typography variant='h6'>
              Latest
            </Typography>
             
            </MenuItem>
            <MenuItem value="oldest">
              <Typography variant='h6'>
                Oldest
              </Typography>
            </MenuItem>
          </Select>
        </FormControl>


        <div>
      <Button variant="contained" onClick={handleClick}>
        More Filters
      </Button>
      <Popover
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List>
          <ListItem button>
            <ListItemText primary="Today"  onClick={() => handleFilterChange('today')}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Yesterday" onClick={() => handleFilterChange('yesterday')}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary="This Week" onClick={() => handleFilterChange('oneWeek')}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary="This Month" onClick={() => handleFilterChange('oneMonth')}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Last Six Months" onClick={() => handleFilterChange('sixMonth')}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary="This Year" onClick={() => handleFilterChange('oneYear')}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary="All" onClick={() => handleFilterChange('allTime')}/>
          </ListItem>
        </List>
      </Popover>
    </div>
      </Box>
    </Box>
    <div className='flex flex-row p-10 max-w-full'>
      <QuizFeedBackGraph ratingData={ratingData} />
      <QuizFeedBackGraph ratingData={ratingData} />
    </div>
  </div>  
  )
}

export default Analytics