import React, { useEffect, useState } from 'react'
import { TextField, Button, Container, Typography, Box, Grid, Avatar, Divider, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import API from '../common/apis'; 


const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '', 
    profilePic: null, 
    profilePicUrl: '',
  });   

  // const [image, setImage] = useState(null);
  const [buttonText, setButtonText] = useState('Upload Profile');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // setImage(URL.createObjectURL(file));
      setProfile({
        ...profile,
        profilePic: file,
        profilePicUrl: URL.createObjectURL(file)
      });
      setButtonText('Save Picture');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  }; 

  const handleProfilePicUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setButtonText('Save Picture');
    }
  };


  useEffect(()=>{
    fetchUserProfileData()
  },[])

  const fetchUserProfileData = async () =>{
    try {
      let response = await API.getUserProfile(); 
      let data = response.data.data; 
      console.log(data); 
      setProfile({
        firstName: data.first_name, 
        lastName : data.last_name, 
        email : data.email
      })
    } catch (error) {
      console.log("failed to fetch user frofile information", error); 
      toast.error('Failed to fetch profile data: ');
    }
  }; 

  const handleProfileChange = async (e) =>{
      e.preventDefault(); 
      try {
        
        const response = await API.updateUserProfileInfo({
          first_name : profile.firstName, 
          last_name: profile.lastName, 
          email: profile.email
        }); 
        const data = await response.data
        toast.success('Profile updated successfully');
        // console.log('Profile updated:', data); 
        // Update the profile state with the new data
      setProfile((prevState) => ({
        ...prevState,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
      }));
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
      }
  }; 
  const handleUpdatePassword = async(e) =>{
    e.preventDefault(); 
    if (profile.newPassword !== profile.confirmNewPassword) {
      console.error('Passwords do not match');
      toast.error('New passwords do not match');
      return;
    }
    try {
      await API.updatePassword({
        currentPassword : profile.oldPassword, 
        newPassword : profile.newPassword
      })
      toast.success('Password updated successfully'); 
    } catch (error) {
      console.error('Error updating password:', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to a server
    console.log('Profile submitted:', profile); 
    toast.error('Failed to update password');
  };

  const togglePasswordVisibility = () => {
    setProfile({ ...profile, showPassword: !profile.showPassword });
  };

  return (
    <Container maxWidth="lg">
      <ToastContainer 
      autoClose={5000} 
      hideProgressBar={false} 
      newestOnTop={false} 
      closeOnClick 
      rtl={false} 
      pauseOnFocusLoss 
      draggable 
      pauseOnHover 
      />
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
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2}>
            <Avatar
              alt="Profile Picture"
              src={image}
              sx={{ width: 100, height: 100, fontSize: 54 }}
            >
              {!image && profile.firstName.charAt(0)}
            </Avatar>
            <input
              type="file"
              accept="image/*"
              name="profilePic"
              onChange={handleImageChange}
              style={{ display: 'none' }}
               id="profile-pic-input"
            />
            <label htmlFor="profile-pic-input">
              <Button variant="outlined" component="span" sx={{ padding: '4px 8px', fontSize: '0.875rem', mt: 2 }} onClick={handleProfilePicUpload}>
                {buttonText}
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} sm={10}>
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
              <Grid item xs={12} sm={12}>
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
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleProfileChange}
                  fullWidth
                >
                  Update Basic Information
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" component="h2" gutterBottom>
          Change Password
        </Typography>
        <TextField
          label="Old Password"
          variant="outlined"
          name="oldPassword"
          value={profile.oldPassword}
          onChange={handleChange}
          type={profile.showPassword ? 'text' : 'password'} 
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {profile.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          label="New Password"
          variant="outlined"
          name="newPassword"
          value={profile.newPassword}
          onChange={handleChange}
          type={profile.showPassword ? 'text' : 'password'} 
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {profile.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          label="Confirm New Password"
          variant="outlined"
          name="confirmNewPassword"
          value={profile.confirmNewPassword}
          onChange={handleChange}
          type={profile.showPassword ? 'text' : 'password'} 
          fullWidth 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {profile.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleUpdatePassword}>
          Save
        </Button>
      </Box>
    </Container>
  )
}

export default Profile