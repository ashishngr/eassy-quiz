// import React, { useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Snackbar,
// } from "@mui/material";


// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import { styled } from '@mui/material/styles';
// import API from "../common/apis";
// import copy from 'copy-to-clipboard';  // Ensure this package is installed



// const PlayQuiz = ({ quizId }) => {
//   const [open, setOpen] = useState(false);
//   const [link, setLink] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");

//   const handleClickOpen = async (event) => {
//     event.preventDefault()
//     console.log("Handle Click Open triggered for quiz ID:", quizId); 
//     setLink("http://example.com/quiz/" + quizId);
//       setOpen(true);
//     // try {
      
//       // Temporarily hardcode link for debugging
//         // setLink("http://example.com/quiz/" + quizId);
//         // setOpen(true);
//       // const response = await API.getPrivateQuizLink(quizId);
//       // if (response.status === 200) {
//       //   console.log("Response data", response.data.link)
//       //   setLink(response.data.link);  // Assuming the API returns { link: 'some-link' }
//       //   setOpen(true);  // Open the dialog only when link is successfully fetched
//       // } else {
//       //   setSnackbarMessage("Failed to generate link.");
//       //   // setSnackbarOpen(true);
//     //   // }
//     // } catch (error) {
//     //   // console.error("Error generating link:", error);
//     //   // setSnackbarMessage("Error generating link.");
//     //   // setSnackbarOpen(true);
//     // }
//   };

//   const handleClose = () => {
//     console.log("Dialog closed");
//     setOpen(false);
//     // setOpen(false);
//   };

//   const handleCopyClick = () => {
//     if (link) {
//       copy(link);
//       setSnackbarMessage("Link copied to clipboard!");
//       setSnackbarOpen(true);
//     } else {
//       setSnackbarMessage("No link available to copy.");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <div>
//       <Button variant="contained" color="primary" onClick={handleClickOpen}>
//         Play
//       </Button>
     
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Share Quiz</DialogTitle> 
//         <DialogContent>
//           <TextField
//             label="Quiz Link"
//             value={link}
//             fullWidth
//             InputProps={{
//               readOnly: true,
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCopyClick} color="primary" startIcon={<FileCopyIcon />}>
//             Copy
//           </Button>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage}
//       />
//     </div>
//   );
// };

// export default PlayQuiz;
// import React, { useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Snackbar,
// } from "@mui/material";
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import copy from 'copy-to-clipboard';  // Ensure this package is installed
// import API from "../common/apis";
// const PlayQuiz = ({ quizId }) => {
//   const [open, setOpen] = useState(false);
//   const [link, setLink] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");

//   const handleClickOpen = async () => {
//     console.log("Play button clicked, quizId:", quizId);
//     // setOpen(true);

//     // try {
//     //   const response = await API.getPrivateQuizLink(quizId);
//     //   console.log("API response:", response);
//     //   if (response.status === 200) {
//     //     setLink(response.data.link); // Assuming response contains link in data
//     //     setOpen(true);
//     //   } else {
//     //     setSnackbarMessage("Failed to generate link. Please try again.");
//     //     setSnackbarOpen(true);
//     //   }
//     // } catch (error) {
//     //   console.error("Error generating link:", error);
//     //   setSnackbarMessage("Error generating link. Please try again.");
//     //   setSnackbarOpen(true);
//     // }
//     try {
//       const response = { status: 200, data: { link: "http://example.com/quiz" } };
//       console.log("Simulated API response:", response);
//       if (response.status === 200) {
//         setLink(response.data.link);
//         setOpen(true);
//       } else {
//         setSnackbarMessage("Failed to generate link. Please try again.");
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       console.error("Error generating link:", error);
//       setSnackbarMessage("Error generating link. Please try again.");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleClose = () => {
//     console.log("Closing modal");
//     setOpen(false);
//   };

//   const handleCopyClick = () => {
//     if (link) {
//       copy(link);
//       setSnackbarMessage("Link copied to clipboard!");
//       setSnackbarOpen(true);
//     } else {
//       setSnackbarMessage("No link available to copy.");
//       setSnackbarOpen(true);
//     }
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     // <div>
//     //   <Button variant="contained" color="primary" onClick={handleClickOpen}>
//     //     Play
//     //   </Button>
//     //   <Dialog open={open} onClose={handleClose}>
//     //     <DialogTitle>Share Quiz</DialogTitle>
//     //     <DialogContent>
//     //       <TextField
//     //         label="Quiz Link"
//     //         value={link}
//     //         fullWidth
//     //         InputProps={{
//     //           readOnly: true,
//     //         }}
//     //       />
//     //     </DialogContent>
//     //     <DialogActions>
//     //       <Button onClick={handleCopyClick} color="primary" startIcon={<FileCopyIcon />}>
//     //         Copy
//     //       </Button>
//     //       <Button onClick={handleClose} color="primary">
//     //         Close
//     //       </Button>
//     //     </DialogActions>
//     //   </Dialog>
//     //   <Snackbar
//     //     open={snackbarOpen}
//     //     autoHideDuration={6000}
//     //     onClose={handleSnackbarClose}
//     //     message={snackbarMessage}
//     //   />
//     // </div>
//     <div>
//       <Button variant="contained" color="primary" onClick={handleClickOpen}>
//         Play
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Share Quiz</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Quiz Link"
//             value={link}
//             fullWidth
//             InputProps={{
//               readOnly: true,
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCopyClick} color="primary" startIcon={<FileCopyIcon />}>
//             Copy
//           </Button>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         message={snackbarMessage}
//       />
//     </div>
//   );
// };

// export default PlayQuiz;
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
} from "@mui/material";

import FileCopyIcon from '@mui/icons-material/FileCopy';
import copy from 'copy-to-clipboard';  // Ensure this package is installed
import API from "../common/apis"; // Make sure API is correctly imported

const PlayQuiz = ({ quizId }) => {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleClickOpen = async () => {
    console.log("Play button clicked, quizId:", quizId);
    try {
      const response = await API.getPrivateQuizLink(quizId);
      console.log("API response:", response);
      if (response.status === 200) {
        const quizLink = response.data.link; // Assuming response contains link in data
        window.open(quizLink, "_blank"); // Open link in a new browser tab
        setSnackbarMessage("A new page has been opened where you can participate in the quiz.");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Failed to generate link. Please try again.");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error generating link:", error);
      setSnackbarMessage("Error generating link. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleClose = () => {
    console.log("Closing modal");
    setOpen(false);
  };

  const handleCopyClick = () => {
    if (link) {
      copy(link);
      setSnackbarMessage("Link copied to clipboard!");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("No link available to copy.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Play
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default PlayQuiz;
