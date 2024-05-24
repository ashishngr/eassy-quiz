import React from 'react'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { Box, TextField, MenuItem, Grid, Button, Paper } from '@mui/material';

const difficulties = ['Easy', 'Medium', 'Hard'];
const scopes = ['Public', 'Private', 'IsShared'];
const statuses = ['Published', 'Draft', 'Deleted'];

const UpdateQuiz = () => {
  return (
    <div className=''>
      <form>
        <Box
        sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <Paper sx={{ padding: 4, maxWidth: 800, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
          Basic Information
        </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Category"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Difficulty"
                variant="outlined"
                defaultValue=""
              >
                {difficulties.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Scope"
                variant="outlined"
                defaultValue=""
              >
                {scopes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Shared Email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Status"
                variant="outlined"
                defaultValue=""
              >
                {statuses.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Time Out"
                variant="outlined"
                type="number"
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>
      </Paper>
    </Box>
        <Divider />
        <div>
        <Typography variant="h6" gutterBottom>
          Questions
        </Typography>
        </div>
      </form>
    </div>
  )
}

export default UpdateQuiz