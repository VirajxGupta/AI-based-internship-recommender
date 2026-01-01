import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Paper,
  Divider,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";

export default function ProfilePage() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(
    storedUser || {
      name: "John Doe",
      email: "john.doe@example.com",
      bio: "Full-stack developer passionate about AI and clean UI design.",
      photo: null,
    }
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleLogout = () => {
    navigate("/");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
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
        minHeight: "100vh",
        background: "#fff",
      }}
    >
      {/* 🔹 Navbar with Icons */}
      <AppBar
        position="sticky"
        sx={{
          background: "hsla(216, 90%, 95%, 1.00)",
          mb: 3,
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              sx={{ ...NavyButtonStyles }}
              onClick={() => navigate("/home")}
            >
              Home
            </Button>
            <Button
              sx={{ ...NavyButtonStyles }}
              onClick={() => navigate("/about")}
            >
              About Us
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Card */}
      <Paper
        elevation={16}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 4,
          overflow: "hidden",
          width: { xs: "100%", sm: "90%", md: "75%" },
          maxWidth: "1100px",
          mx: "auto",
        }}
      >
        {/* Left Branding */}
        <Box
          sx={{
            flex: 0.8,
            background: "hsla(216, 90%, 30%, 1.00)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Your Profile
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, maxWidth: "240px" }}>
            Manage your details and control your account at one place.
          </Typography>
        </Box>

        {/* Right Profile */}
        <Box
          sx={{
            flex: 2,
            p: { xs: 3, sm: 5 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor:"hsla(216, 90%, 95%, 1.00)"
          }}
        >
          {/* Avatar */}
          <Box sx={{ position: "relative", mb: 2}}>
            <Avatar
              src={user.photo}
              sx={{
                width: 120,
                height: 120,
                boxShadow: 3,
                border: "3px solid #1e3c72",
                cursor: "pointer",
              }}
            >
              <PersonIcon sx={{ fontSize: 50 }} />
            </Avatar>
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                bgcolor: "white",
                border: "1px solid #ccc",
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <CameraAltIcon />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoChange}
              />
            </IconButton>
          </Box>

          <Typography component="h1" variant="h5" fontWeight="bold" mb={2}>
            Profile Information
          </Typography>

          <Divider sx={{ width: "100%", mb: 2 }} />

          {/* Form */}
          <Box sx={{ width: "100%", maxWidth: "500px" }}>
            <TextField
              margin="normal"
              fullWidth
              label="Full Name"
              value={user.name}
              InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1 }} /> }}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              value={user.email}
              InputProps={{ startAdornment: <EmailIcon sx={{ mr: 1 }} /> }}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Bio"
              value={user.bio}
              multiline
              rows={3}
              InputProps={{ startAdornment: <InfoIcon sx={{ mr: 1 }} /> }}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
            />

            {/* Save + Logout */}
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<PersonIcon />}
                  onClick={() => alert("Profile saved ✅")}
                  sx={{...NavyButtonStyles}}
                >
                  Save
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  color="error"
                  onClick={handleLogout}
                  sx={{ py: 1.3, fontWeight: "bold", borderRadius: "12px" }}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
