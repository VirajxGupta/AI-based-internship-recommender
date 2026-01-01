import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Link,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { toast } from "react-hot-toast";

import Ashoka_Chakra from "../assets/Ashoka_Chakra.svg"; // Logo

const CORE_NAVY_COLOR = "hsla(216, 90%, 39%, 1.00)";

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Signup successful ✅");
        navigate("/login");
      } else {
        toast.error(data.message || "Signup failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* =================== NAVBAR =================== */}
      <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#000", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: { xs: 2, md: 6 }, py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
            <img src={Ashoka_Chakra} alt="Ashoka_Chakra" style={{ width: 200, height: 55 }} />
            <Box>
              <Typography variant="h6" fontWeight="bold" color="#000" sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' }, lineHeight: 1.2 }}>
                PM Internship Scheme
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', lineHeight: 1, display: { xs: 'none', sm: 'block' } }}>
                Ministry of Corporate Affairs, Government of India
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: CORE_NAVY_COLOR, color: "#fff", fontWeight: "bold", textTransform: "none", "&:hover": { backgroundColor: "hsla(216, 90%, 20%, 1.00)" } }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Box>

          <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={handleMenuClick} color={CORE_NAVY_COLOR}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={() => { navigate("/signup"); handleMenuClose(); }}>Register</MenuItem>
          </Menu>
        </Toolbar>
        <Box sx={{ bgcolor: CORE_NAVY_COLOR, height: 20 }}></Box>
      </AppBar>

      {/* =================== SIGNUP FORM =================== */}
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", py: 4, backgroundImage: "linear-gradient(180deg, #f5f7fb 0%, #e0e7f7 100%)" }}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <img src={Ashoka_Chakra} alt="Ashoka_ Chakra" style={{ width: 60, height: 60, opacity: 0.8 }} />
          <Typography variant="h5" fontWeight="bold" color={CORE_NAVY_COLOR} sx={{ mt: 1 }}>
            PM Internship Portal
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Ministry of Corporate Affairs, Government of India
          </Typography>

          <Paper elevation={4} sx={{ p: { xs: 3, sm: 5 }, borderRadius: "12px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PersonAddIcon sx={{ color: CORE_NAVY_COLOR, mr: 1 }} />
              <Typography component="h1" variant="h6" fontWeight="bold" color={CORE_NAVY_COLOR}>
                Create Account
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Join the internship portal and start your journey
            </Typography>

            {/* DEMO CREDENTIALS */}
            <Box sx={{ p: 1.5, mb: 3, bgcolor: 'hsla(48, 100%, 90%, 1)', border: '1px solid hsla(48, 100%, 70%, 1)', borderRadius: '8px', width: '100%', fontSize: '0.85rem' }}>
              <Typography variant="body2" fontWeight="bold" sx={{ color: 'hsla(30, 80%, 30%, 1)' }}>Demo Credentials:</Typography>
              <Typography variant="body2" sx={{ color: 'hsla(30, 80%, 30%, 1)' }}>Email: <Link sx={{ fontWeight: 'bold' }}>demo@example.com</Link> </Typography>
              <Typography variant="body2" sx={{ color: 'hsla(30, 80%, 30%, 1)' }}>Password: <Link sx={{ fontWeight: 'bold' }}>demo123</Link></Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
              <TextField margin="normal" required fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon color="action" /></InputAdornment> }} />
              <TextField margin="normal" required fullWidth label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon color="action" /></InputAdornment> }} />
              <TextField margin="normal" required fullWidth label="Password" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon color="action" /></InputAdornment>, endAdornment: <InputAdornment position="end" onClick={() => setShowPassword(!showPassword)} sx={{ cursor: "pointer" }}>{showPassword ? <VisibilityOff /> : <Visibility />}</InputAdornment> }} />
              <TextField margin="normal" required fullWidth label="Confirm Password" type={showConfirm ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon color="action" /></InputAdornment>, endAdornment: <InputAdornment position="end" onClick={() => setShowConfirm(!showConfirm)} sx={{ cursor: "pointer" }}>{showConfirm ? <VisibilityOff /> : <Visibility />}</InputAdornment> }} />

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5, fontSize: "1rem", fontWeight: "bold", borderRadius: "8px", textTransform: "none", background: CORE_NAVY_COLOR, "&:hover": { background: "hsla(216, 90%, 20%, 1.00)" } }}>
                Sign Up
              </Button>

              {/* SECURITY NOTICE */}
              <Box sx={{ p: 1.5, mt: 3, bgcolor: 'hsla(48, 100%, 90%, 1)', border: '1px solid hsla(48, 100%, 70%, 1)', borderRadius: '8px', width: '100%', fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}>
                <i className="fa-solid fa-lock" style={{ color: 'hsla(30, 80%, 30%, 1)', marginRight: '8px' }}></i>
                <Typography variant="body2" sx={{ color: 'hsla(30, 80%, 30%, 1)', fontStyle: 'italic' }}>
                  Security Notice: Never share your login credentials. Always logout after use.
                </Typography>
              </Box>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Link component="button" variant="body2" sx={{ color: CORE_NAVY_COLOR, fontWeight: "bold" }} onClick={() => navigate("/login")}>
                  Login
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* =================== FOOTER =================== */}
      <Box component="footer" sx={{ bgcolor: CORE_NAVY_COLOR, color: "#fff", py: 6 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem", mb: 2 }}>PM Internship Scheme</Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ mb: 2 }}>
                Bridging academic learning with industry requirements through quality internship opportunities.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <img src={Ashoka_Chakra} alt="Ashoka_" style={{ width: 30, height: 30, mr: 1, filter: "invert(100%)" }} />
                <Typography variant="body2" color="rgba(255,255,255,0.7)">Ministry of Corporate Affairs</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}