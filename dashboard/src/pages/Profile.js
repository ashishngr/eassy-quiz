import React, { useState } from 'react'
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '', 
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to a server
    console.log('Profile submitted:', profile);
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={profile.email}
              onChange={handleChange}
              type="email"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="outlined"
              name="address"
              value={profile.address}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <Typography variant="h5" component="h2" gutterBottom>
          Change Password
        </Typography>
        <TextField
          label="Old Password"
          variant="outlined"
          name="oldPassword"
          value={profile.oldPassword}
          onChange={handleChange}
          type="password"
          fullWidth
        />
        <TextField
          label="New Password"
          variant="outlined"
          name="newPassword"
          value={profile.newPassword}
          onChange={handleChange}
          type="password"
          fullWidth
        />
        <TextField
          label="Confirm New Password"
          variant="outlined"
          name="confirmNewPassword"
          value={profile.confirmNewPassword}
          onChange={handleChange}
          type="password"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save
        </Button>
      </Box>
    </Container>
  )
}

export default Profile