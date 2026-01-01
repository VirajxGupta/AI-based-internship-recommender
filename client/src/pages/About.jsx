import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Icons used in the Navbar/Footer (Imported for consistency)
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import WorkIcon from "@mui/icons-material/Work";
import MenuIcon from "@mui/icons-material/Menu";
import AshokChakra from "../assets/Ashoka_Chakra.svg";

// Mock imports (replace with actual paths in your project)
import pulastyaPhoto from "../assets/pulastya.png";
import nihariPhoto from "../assets/Nihari.jpg";
import alokPhoto from "../assets/alok.jpg";
import visheshPhoto from "../assets/vishesh.jpg";
import virajPhoto from "../assets/viraj.jpg";
import prernaPhoto from "../assets/prerna.jpg";

// --- GLOBAL STYLES & CONSTANTS ---
const CORE_NAVY_COLOR = "hsla(216, 90%, 39%, 1.00)"; // Main blue color

// Button Style matching the latest Navbar requirement
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

// Footer Styles & Data (Retained from previous interactions)
const FooterStyles = {
    mainFooter: { bgcolor: "linear-gradient(0deg, #fff , #0a52bdff)", color: "#fff", py: 6, },
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

// Navigation Items for the main row (Home, Explore, About, Register, Login)
const navItems = [
  { label: "Home", path: "/home" },
  { label: "Explore", path: "/resume" },
  { label: "Logout", path: "/" },
];

// --- NAVBAR COMPONENT ---
function AppNavbar({ navigate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const handleNavClick = (path) => { navigate(path); handleClose(); };

  return (
    <>

      {/* Main AppBar */}
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
              style={{ width: 200, height: 60 }}
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

// --- FOOTER COMPONENT ---
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


// --- MAIN ABOUT US COMPONENT ---

const teamMembers = [
  { name: "Viraj Gupta", role: "FullStack Developer", photo: virajPhoto },
  { name: "Vishesh Dwivedi", role: "FullStack Developer", photo: visheshPhoto },
  { name: "Nihari Shrivastava", role: "Frontend Developer", photo: nihariPhoto },
  { name: "Alok Singh Kushwaha", role: "Frontend Developer", photo: alokPhoto },
  { name: "Pulastya Bhagwat", role: "ML Developer", photo: pulastyaPhoto },
  { name: "Prerna Pandey", role: "UI/UX Designer", photo: prernaPhoto },
];

export default function AboutUs() {
  const navigate = useNavigate();

  // Removed old NavButton and menu state/logic which is now handled by AppNavbar

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // Keeping the original Indian flag gradient background
        background: "linear-gradient(0deg, #0a52bdff , #fff)",
        color: "#000080",
        overflowX: "hidden",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 1. Navbar */}
      <AppNavbar navigate={navigate} />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1 }}>
          
        {/* About Header */}
        <Box sx={{ p: { xs: 3, md: 6 }, textAlign: "center" }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: "#000080" }}>
            About Us
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, color: "#000080" }}>
            We are a professional team dedicated to building intuitive apps for everyone.
          </Typography>
        </Box>

        {/* Team Section */}
        <Box sx={{ maxWidth: 1200, mx: "auto", mb: 6, px: 2 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center" sx={{ color: "#000080" }}>
            Meet Our Team
          </Typography>
          <Typography sx={{ opacity: 0.85, mb: 4, textAlign: "center", color: "#000080" }}>
            Passionate professionals driving innovation in tech and ML.
          </Typography>

          {/* Team Grid: Improved Responsiveness and Consistent Card Size */}
          <Grid container spacing={4} justifyContent="center" alignItems="stretch">
            {teamMembers.map((member, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx} sx={{ display: 'flex' }}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    textAlign: "center",
                    width: '100%', // Ensure all cards fill the grid column
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: 'center', // Vertically center content if card height varies slightly
                    minHeight: { xs: 200, md: 250 }, // Consistent minimum height
                    background: "#ffffffcc",
                    boxShadow: "0px 8px 25px rgba(0,0,0,0.4)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      backgroundColor: "hsla(216, 90%, 90%, 1.00)",
                      boxShadow: "0px 15px 40px rgba(0,0,0,0.6)",
                    },
                  }}
                  elevation={6}
                >
                  <Avatar
                    src={member.photo}
                    sx={{ width: 90, height: 90, mb: 1.5, boxShadow: "0px 15px 40px rgba(0,0,0,0.6)" }}
                  />
                  <Typography variant="h6" fontWeight="bold" sx={{ color: "#000080", mb: 0.5, lineHeight: 1.2 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: CORE_NAVY_COLOR, fontWeight: "bold", fontSize: '0.9rem', lineHeight: 1.2 }}>
                    {member.role}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* 2. Footer */}
      <AppFooter />
    </Box>
  );
}
