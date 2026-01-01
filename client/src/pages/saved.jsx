import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Collapse,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import LogoutIcon from "@mui/icons-material/Logout";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import AshokChakra from "../assets/Ashoka_Chakra.svg";

export default function SavedInternships() {
  const [open, setOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();


  // const handleApply = () => {
  //   navigate("/apply");
  // };

  const handleLogout = () => {
    navigate("/");
  };

  const savedInternships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechVision Pvt. Ltd.",
      location: "Remote",
      sector: "Technology",
      duration: "3 Months",
      stipend: "₹10,000/month",
      postedOn: "Sept 5, 2025",
      description:
        "We are looking for a passionate Frontend Developer Intern to join our tech team. You will work on building modern, responsive web applications using React, JavaScript, and Material-UI.",
      skills: ["React", "JavaScript", "UI/UX", "Git", "Teamwork"],
      responsibilities: [
        "Develop UI components using React & MUI",
        "Collaborate with backend developers",
        "Fix bugs and optimize performance",
      ],
    },
    {
      id: 2,
      title: "Digital Marketing Intern",
      company: "Growthify Marketing",
      location: "Hybrid",
      sector: "Marketing",
      duration: "2 Months",
      stipend: "₹8,000/month",
      postedOn: "Sept 3, 2025",
      description:
        "Join our marketing team to learn SEO, social media management, and ad campaigns. Work on real projects and boost your portfolio.",
      skills: ["SEO", "Social Media", "Content Writing"],
      responsibilities: [
        "Manage social media accounts",
        "Assist in running ad campaigns",
        "Write engaging content",
      ],
    },
  ];

  const handleOpen = (internship) => {
    setSelectedInternship(internship);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedInternship(null);
    setOpen(false);
  };
  const NavyButtonStyles = {
  backgroundColor: "hsla(216, 90%, 39%, 1.00)",
  color: "#fff",
  border: `2px solid #0a53be`,
  textTransform: "none",
  fontWeight: "bold",
  px: 3,
  py: 1,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "hsla(216, 90%, 20%, 1.00)",
    transform: "translateY(-2px)",
    border: "2px solid hsla(216, 90%, 20%, 1.00)",
    boxShadow: "0 4px 8px hsla(0, 0%, 0%, 0.25)",
  },
};

  return (
    <Box
      sx={{
        py: 0,
        minHeight: "100vh",
        background: "linear-gradient(0deg, #0a52bdff , #fff)",
      }}
    >
      {/* 🔹 Navbar */}
      <AppBar
        position="sticky"
        sx={{
          background: "#fff",
          mb: 4,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <img
                        src={AshokChakra}
                        alt="Ashok Chakra"
                        style={{ width: 200, height: 50 }}
                      />
          <Typography variant="h5" fontWeight="bold" color="hsla(216, 90%, 20%, 1.00)">
            Internship Recommender
          </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button sx={{ ...NavyButtonStyles }}  onClick={() => navigate("/home")}>
              Home
            </Button>
            <Button sx={{ ...NavyButtonStyles }}  onClick={() => navigate("/resume")}>
              Explore
            </Button>
            <Button sx={{ ...NavyButtonStyles }}  onClick={() => navigate("/about")}>
              About
            </Button>
            <Button sx={{ ...NavyButtonStyles }}  onClick={() => navigate("/profile")}>
              Profile
            </Button>
            <Button sx={{ ...NavyButtonStyles }}  onClick={handleLogout}>
              Logout
            </Button>
          </Box>

          {/* Mobile Menu Toggle */}
          <IconButton sx={{ display: { xs: "flex", md: "none" }, color: "white" }} onClick={() => setMenuOpen(!menuOpen)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>

        {/* Mobile Nav */}
        <Collapse in={menuOpen}>
          <Box sx={{ display: "flex", flexDirection: "column", backgroundColor: "rgba(255,255,255,0.1)", px: 2, pb: 2 }}>
            <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate("/")}>Home</Button>
            <Button color="inherit" startIcon={<WorkOutlineIcon />} onClick={() => navigate("/explore")}>Explore</Button>
            <Button color="inherit" startIcon={<InfoOutlinedIcon />} onClick={() => navigate("/about")}>About</Button>
            <Button color="inherit" startIcon={<PersonOutlineIcon />} onClick={() => navigate("/profile")}>Profile</Button>
            <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>Logout</Button>
          </Box>
        </Collapse>
      </AppBar>

      {/* 🔹 Saved Internships */}
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Paper
            elevation={10}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 4,
              backdropFilter: "blur(14px)",
              background: "hsla(216, 90%, 95%, 1.00)",
            }}
          >
            <Avatar sx={{ bgcolor: "hsla(216, 90%, 20%, 1.00)", width: 60, height: 60, mx: "auto", mb: 2 }}>
              <BookmarkAddedIcon fontSize="medium" />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
              Applied Internships
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
              Here are the internships you have Applied for 🚀
            </Typography>

            {/* Cards */}
            <Grid container spacing={3}>
              {savedInternships.map((internship) => (
                <Grid item xs={12} sm={6} md={4} key={internship.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 3,
                      boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                      transition: "0.3s",
                      "&:hover": { transform: "translateY(-6px)" },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <WorkIcon color="primary" />
                        <Typography variant="h6" fontWeight="bold">{internship.title}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">{internship.company}</Typography>
                      <Typography variant="body2" fontWeight={500} color="primary">📍 {internship.location}</Typography>
                      <Typography variant="body2">Sector: {internship.sector}</Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mt: 1 }}>
                        {internship.skills.map((skill, idx) => (
                          <Chip key={idx} label={skill} size="small" color="info" />
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions sx={{ display: "flex", flexDirection: "column", gap: 2, px: 3, pb: 2 }}>
                      <Button fullWidth sx={{ ...NavyButtonStyles }} onClick={() => handleOpen(internship)}>
                        View Details
                      </Button>
                      {/* <Button onClick={handleApply} fullWidth sx={{ ...NavyButtonStyles}}>
                        Apply Now
                      </Button> */}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* 🔹 Details Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            background: "hsla(216, 80%, 90%, 1.00)",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {selectedInternship?.title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" gutterBottom><strong>Company:</strong> {selectedInternship?.company}</Typography>
          <Typography variant="body2" gutterBottom><strong>Location:</strong> {selectedInternship?.location}</Typography>
          <Typography variant="body2" gutterBottom><strong>Sector:</strong> {selectedInternship?.sector}</Typography>
          <Typography variant="body2" gutterBottom><strong>Duration:</strong> {selectedInternship?.duration}</Typography>
          <Typography variant="body2" gutterBottom><strong>Stipend:</strong> {selectedInternship?.stipend}</Typography>
          <Typography variant="body2" gutterBottom><strong>Posted On:</strong> {selectedInternship?.postedOn}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" gutterBottom><strong>Description:</strong> {selectedInternship?.description}</Typography>
          <Typography variant="body2" gutterBottom><strong>Responsibilities:</strong></Typography>
          <ul style={{ paddingLeft: "1.2rem" }}>
            {selectedInternship?.responsibilities.map((res, i) => (
              <li key={i}>
                <Typography variant="body2">{res}</Typography>
              </li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{...NavyButtonStyles}}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}