import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Paper,
  InputAdornment,
  Container,
  AppBar,
  Toolbar,
  // Retained imports for the menu structure, though simplified in AppNavbar
  IconButton, 
  Menu,
  MenuItem,
} from "@mui/material";

// Material Icons/Fa-Solid Equivalents
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info"; // Used for About
import MenuIcon from "@mui/icons-material/Menu"; // Hamburger menu icon
// Other icons (retained for footer/main content)
import DescriptionIcon from "@mui/icons-material/Description"; 
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ContactMailIcon from "@mui/icons-material/ContactMail";

import AshokChakra from "../assets/Ashoka_Chakra.svg";
import { toast } from "react-hot-toast";

// --- GLOBAL STYLES & CONSTANTS ---
const CORE_NAVY_COLOR = "hsla(216, 90%, 39%, 1.00)"; // Main blue color

// Updated Button Style (Single, contained style for all nav items)
const NavbarButtonStyles = {
  backgroundColor: CORE_NAVY_COLOR,
  color: "#fff",
  textTransform: "none",
  fontWeight: "bold",
  minWidth: 100,
  px: 2,
  py: 1,
  borderRadius: '4px',
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "hsla(216, 90%, 20%, 1.00)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
};

// Footer Styles (Retained)
const FooterStyles = {
    mainFooter: { bgcolor: CORE_NAVY_COLOR, color: "#fff", py: 6, },
    heading: { fontWeight: "bold", fontSize: "1.1rem", mb: 2, color: "rgba(255, 255, 255, 0.9)", },
    link: { display: "block", textDecoration: "none", color: "rgba(255, 255, 255, 0.7)", mb: 1, fontSize: "0.9rem", transition: "color 0.2s", "&:hover": { color: "#fff", }, },
    linkWithIcon: { display: "flex", alignItems: "flex-start", textDecoration: "none", color: "rgba(255, 255, 255, 0.7)", mb: 1.5, fontSize: "0.9rem", transition: "color 0.2s", "&:hover": { color: "#fff", }, "& i": { mr: 1, mt: "3px", fontSize: "0.8rem", }},
    copyrightBar: { borderTop: "1px solid rgba(255, 255, 255, 0.1)", pt: 2, mt: 4, fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.7)", },
    govLogo: { width: 30, height: 30, mr: 1, filter: "invert(100%)", }
};

const quickLinks = [
    { label: "Guidelines & Instructions", icon: <i className="fa-solid fa-file-alt" />, href: "#" },
    { label: "Eligibility Criteria", icon: <i className="fa-solid fa-graduation-cap" />, href: "#" },
    { label: "Application Process", icon: <i className="fa-solid fa-list-check" />, href: "#" },
    { label: "Frequently Asked Questions", icon: <i className="fa-solid fa-circle-question" />, href: "#" },
];

const governmentLinks = [
    { label: "India.gov.in", href: "https://www.india.gov.in" },
    { label: "Ministry of Corporate Affairs", href: "https://www.mca.gov.in" },
    { label: "Digital India", href: "https://digitalindia.gov.in" },
    { label: "MyGov.in", href: "https://www.mygov.in" },
];


// --- MODIFIED APP NAVBAR COMPONENT (Single-Row, Button-Style) ---

// Navigation Items for the main row
const navItems = [
  { label: "Register", path: "/signup" },
];

function AppNavbar({ navigate }) {
  // Mobile menu state and handlers
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const handleNavClick = (path) => { navigate(path); handleClose(); };

  return (
    <>
      {/* 1. Main AppBar (Logo, Title, All Buttons) */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: { xs: 2, md: 6 }, py: 1 }}>
          
          {/* Left: Logo + Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: 'pointer' }} onClick={() => navigate("/")}>
            <img
              src={AshokChakra}
              alt="Ashok Chakra"
              style={{ width: 200, height: 55 }}
            />
            <Box>
                <Typography variant="h6" fontWeight="bold" color="#000" sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' }, lineHeight: 1.2 }}>
                    PM Internship Scheme
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', lineHeight: 1, display: { xs: 'none', sm: 'block' } }}>
                    Ministry of Corporate Affairs, Government of India
                </Typography>
            </Box>
          </Box>

          {/* Right: All Navigation Buttons (Desktop) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            {navItems.map((item) => (
                <Button
                    key={item.label}
                    variant="contained"
                    sx={NavbarButtonStyles}
                    onClick={() => navigate(item.path)}
                >
                    {item.label}
                </Button>
            ))}
          </Box>

          {/* Mobile Hamburger Menu Button (xs/sm only) */}
          <IconButton
              aria-label="menu"
              onClick={handleClick}
              sx={{ display: { xs: 'block', md: 'none' }, color: CORE_NAVY_COLOR }}
          >
              <MenuIcon />
          </IconButton>
        </Toolbar>
        
        {/* The solid blue bar underneath the main navigation in the screenshot */}
        <Box sx={{ bgcolor: CORE_NAVY_COLOR, height: 20 }}></Box>
      </AppBar>

      {/* Mobile Menu Dropdown for all navigation links (xs/sm only) */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        {navItems.map((item) => (
            <MenuItem key={item.label} onClick={() => handleNavClick(item.path)}>
                {item.label}
            </MenuItem>
        ))}
      </Menu>
    </>
  );
}

// --- APP FOOTER COMPONENT (Remains Unchanged) ---

function AppFooter() {
    return (
        <Box component="footer" sx={FooterStyles.mainFooter}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography sx={FooterStyles.heading}>PM Internship Scheme</Typography>
                        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ mb: 2 }}>
                            Bridging the gap between academic learning and industry requirements through quality internship opportunities in India's leading companies.
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <img src={AshokChakra} alt="Ashok Stambh" style={FooterStyles.govLogo} />
                            <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                                Ministry of Corporate Affairs
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Typography sx={FooterStyles.heading}>Quick Links</Typography>
                        {quickLinks.map((link, index) => (
                            <Box component="a" href={link.href} key={index} sx={FooterStyles.linkWithIcon}><i className={link.icon.props.className} />{link.label}</Box>
                        ))}
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <Typography sx={FooterStyles.heading}>Support</Typography>
                        <Box sx={FooterStyles.linkWithIcon}><i className="fa-solid fa-envelope" /> support@pminternship.mca.gov.in</Box>
                        <Box sx={FooterStyles.linkWithIcon}><i className="fa-solid fa-phone" /> 1800-123-456 (Toll Free)</Box>
                        <Box sx={FooterStyles.linkWithIcon}><i className="fa-solid fa-location-dot" /> 
                            <Box>Ministry of Corporate Affairs<br />Shastri Bhawan, New Delhi - 110001</Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography sx={FooterStyles.heading}>Government Links</Typography>
                        {governmentLinks.map((link, index) => (
                            <Box component="a" href={link.href} key={index} target="_blank" rel="noopener noreferrer" sx={FooterStyles.link}>{link.label}</Box>
                        ))}
                    </Grid>
                </Grid>
                <Box sx={FooterStyles.copyrightBar}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
                            <Typography variant="body2" component="span">© 2024 Government of India. All rights reserved.</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: 'flex', gap: 3, order: { xs: 1, md: 2 }, mb: { xs: 2, md: 0 }, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                            <Box component="a" href="#" sx={FooterStyles.link} style={{ display: 'inline' }}>Privacy Policy</Box>
                            <Box component="a" href="#" sx={FooterStyles.link} style={{ display: 'inline' }}>Terms of Use</Box>
                            <Box component="a" href="#" sx={FooterStyles.link} style={{ display: 'inline' }}>Accessibility</Box>
                            <Box component="a" href="#" sx={FooterStyles.link} style={{ display: 'inline' }}>Sitemap</Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}


// --- MAIN LOGIN PAGE COMPONENT ---
export default function LoginPage() {
  // Retaining original state and logic variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email"); 
  const navigate = useNavigate();

  // 🚨 ORIGINAL SUBMIT LOGIC IS RETAINED FOR REDIRECTION 🚨
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginValue = loginMethod === 'email' ? email : '9876543210';
    
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginValue, password }), 
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful! ✅");
        // *** SUCCESSFUL REDIRECTION TO HOME PAGE ***
        navigate("/home"); 
      } else {
        toast.error(data.message || "Invalid credentials ❌");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Something went wrong ❌");
    }
  };

  const handleDigiLockerLogin = () => {
    const clientId = "YOUR_DIGILOCKER_CLIENT_ID"; 
    const redirectUri = "http://localhost:3000/digilocker-callback";
    const responseType = "code";
    const scope = "openid profile";

    const authUrl = `https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}`;

    toast.info("Redirecting to DigiLocker...");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fb", display: 'flex', flexDirection: 'column' }}>
      {/* 1. Navbar Component (MODIFIED) */}
      <AppNavbar navigate={navigate} />

      {/* 2. Main Login Content Wrapper (Retained) */}
      <Box
        sx={{
          py: 4,
          flexGrow: 1, 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage: "linear-gradient(180deg, #f5f7fb 0%, #e0e7f7 100%)", 
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 2, mb: 4 }}>
          {/* Central Ashoka Chakra & Portal Title */}
          <img
            src={AshokChakra}
            alt="Ashok Chakra"
            style={{ width: 60, height: 60, opacity: 0.8 }}
          />
          <Typography variant="h5" fontWeight="bold" color={CORE_NAVY_COLOR} sx={{ mt: 1 }}>
            PM Internship Portal
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Ministry of Corporate Affairs, Government of India
          </Typography>
        </Container>

        {/* Login Form Card (Retained) */}
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: "12px",
            width: { xs: "90%", sm: "450px" },
            maxWidth: "450px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Card Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LoginIcon sx={{ color: CORE_NAVY_COLOR, mr: 1 }} />
            <Typography component="h1" variant="h6" fontWeight="bold" color={CORE_NAVY_COLOR}>
              Login
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Access your internship portal account
          </Typography>

          {/* Demo Credentials Box */}
          <Box 
            sx={{
              p: 1.5,
              mb: 3,
              bgcolor: 'hsla(48, 100%, 90%, 1)',
              border: '1px solid hsla(48, 100%, 70%, 1)',
              borderRadius: '8px',
              width: '100%',
              fontSize: '0.85rem',
            }}
          >
            <Typography variant="body2" fontWeight="bold" sx={{ color: 'hsla(30, 80%, 30%, 1)' }}>
              Demo Credentials:
            </Typography>
            <Typography variant="body2" sx={{ color: 'hsla(30, 80%, 30%, 1)' }}>
              Email: <Link sx={{fontWeight: 'bold'}}>demo@example.com</Link> 
            </Typography>
            <Typography variant="body2" sx={{ color: 'hsla(30, 80%, 30%, 1)' }}>
              Password: <Link sx={{fontWeight: 'bold'}}>demo123</Link>
            </Typography>
          </Box>

          {/* Tab Switcher: Email ID / Mobile No. */}
          

          <Box component="form" sx={{ width: "100%" }} onSubmit={handleSubmit}>
            {/* Email/Mobile Input */}
            <TextField
              margin="normal"
              required
              fullWidth
              label={loginMethod === 'email' ? "Email ID *" : "Mobile No. *"}
              placeholder={loginMethod === 'email' ? "Enter your email ID" : "Enter your mobile number"}
              value={loginMethod === 'email' ? email : "9876543210"} 
              onChange={(e) => loginMethod === 'email' ? setEmail(e.target.value) : null} 
              type={loginMethod === 'email' ? "email" : "tel"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className={loginMethod === 'email' ? "fa-solid fa-user" : "fa-solid fa-mobile-alt"} style={{fontSize: '0.9rem'}} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />

            {/* Password Input */}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password *"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fa-solid fa-lock" style={{fontSize: '0.9rem'}} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />

            {/* Remember me & Forgot Password */}
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <input type="checkbox" id="remember" name="remember" />
                        <label htmlFor="remember" style={{ marginLeft: 4, fontSize: '0.875rem' }}>Remember me</label>
                    </Box>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2" sx={{ color: CORE_NAVY_COLOR, fontWeight: 'bold' }}>
                        Forgot Password?
                    </Link>
                </Grid>
            </Grid>

            {/* Sign In Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none",
                background: CORE_NAVY_COLOR,
                "&:hover": {
                  background: "hsla(216, 90%, 20%, 1.00)",
                },
              }}
            >
              Sign In
            </Button>

            {/* OR line */}
            <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
              <Box sx={{ flex: 1, height: "1px", backgroundColor: "#ccc" }} />
              <Typography variant="body2" sx={{ mx: 2, color: "#666", fontWeight: "bold" }}>
                OR
              </Typography>
              <Box sx={{ flex: 1, height: "1px", backgroundColor: "#ccc" }} />
            </Box>
            
            {/* DigiLocker Login Button */}
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<DescriptionIcon />} 
              sx={{
                mt: 1,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none",
                border: "2px solid #000080",
                color: "#000080",
                "&:hover": {
                  backgroundColor: "rgba(19,136,8,0.1)",
                  borderColor: "#138808",
                  color: "#138808",
                },
              }}
              onClick={handleDigiLockerLogin}
            >
              Login with DigiLocker
            </Button>

            {/* Register Now link */}
            <Box sx={{ textAlign: 'center', my: 2 }}>
                <Typography variant="body2" component="span">
                    New to PM Internship Portal?
                </Typography>
                <Link
                    component="button"
                    type="button"
                    variant="body2"
                    sx={{ color: CORE_NAVY_COLOR, fontWeight: 'bold', ml: 0.5 }}
                    onClick={() => navigate("/signup")}
                >
                    Register Now
                </Link>
            </Box>
            
             {/* Security Notice Box */}
            <Box 
                sx={{
                    p: 1.5,
                    mt: 3,
                    bgcolor: 'hsla(48, 100%, 90%, 1)',
                    border: '1px solid hsla(48, 100%, 70%, 1)',
                    borderRadius: '8px',
                    width: '100%',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <i className="fa-solid fa-lock" style={{ color: 'hsla(30, 80%, 30%, 1)', marginRight: '8px' }}></i>
                <Typography variant="body2" sx={{ color: 'hsla(30, 80%, 30%, 1)', fontStyle: 'italic' }}>
                    **Security Notice:** Never share your login credentials. Always logout after use.
                </Typography>
            </Box>
          </Box>
        </Paper>
        
        {/* Helper Links (Help, Privacy, Terms) below the form */}
        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Link href="#" variant="body2" color="text.secondary">Help</Link>
            <Link href="#" variant="body2" color="text.secondary">Privacy</Link>
            <Link href="#" variant="body2" color="text.secondary">Terms</Link>
        </Box>

      </Box>

      {/* 3. Footer Component */}
      <AppFooter />
    </Box>
  );
}