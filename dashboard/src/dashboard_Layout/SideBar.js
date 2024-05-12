import React from 'react'; 
import QuizLogo from "../assets/question.png"
import { MdHomeMax } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';import { styled, useTheme } from '@mui/material/styles';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';



import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



const SideBar = () => {

  const navigate = useNavigate();


  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path : '/admin/dashboard/home'},
    { text: 'Quiz', icon: <QuizIcon />, path : '/admin/dashboard/quiz' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path : '/admin/dashboard/analytics' },
    { text: 'Profile', icon: <AccountBoxIcon />, path : '/admin/dashboard/profile' },
  ];

  const handleItemClick = (path) => {
    navigate(path);
  };


  return (
    <Box>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Eaasy Quiz
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleItemClick(item.path)} 
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        
      </Drawer>
    </Box>
    
    // <div className="w-60 h-full overflow-y-auto bg-white  text-lg font-sans subpixel-antialiased transition duration-300 ease-in-out flex flex-col items-center border-solid border-r-4 border-light-blue-500">
    //   <div className="flex flex-col items-center py-4 px-6">
    //     <img className="w-20 h-20 mb-2" src={QuizLogo} alt="Your Platform Logo" /> 
    //     <h1 className="text-lg font-medium text-center"> {/* Username with styling */}
    //       Ashish Nagar
    //     </h1>
    //   </div>
    //   <ul className="mt-3 space-y-2 ">
    //     <li className="w-52 py-2 px-3 flex items-center hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 hover:text-white  hover:rounded-lg">
    //       {<MdHomeMax className='mr-2'/>}
    //         <a href="/admin/dashboard/home" className="flex items-center justify-center gap-2 text-sm" >
    //           Home
    //         </a>
    //     </li>
    //     <li className="w-52 py-2 px-3 flex items-center hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 hover:text-white hover:rounded-lg">
    //       {<MdOutlineQuiz className='mr-2'/>}
    //       <a href="/admin/dashboard/quiz" className="flex items-center justify-center gap-2 text-sm ">
    //          Quiz
    //       </a>
    //     </li>
    //     <li className="w-52 py-2 px-3 flex items-center hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 hover:text-white hover:rounded-lg ">
    //     {<TbBrandGoogleAnalytics className='mr-2'/>}
    //       <a href="/admin/dashboard/analytics" className="flex items-center justify-center gap-2 text-sm ">
    //        Analytic
    //       </a>
    //     </li>
    //     <li className="w-52 py-2 px-3 flex items-center hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 hover:text-white hover:rounded-lg">
    //     {<CgProfile className='mr-2'/> }
    //       <a href="/admin/dashboard/profile" className="flex items-center justify-center gap-2 text-sm ">
    //         Profile
    //       </a>
    //     </li>
    //   </ul>
    // </div>
  )
}

export default SideBar