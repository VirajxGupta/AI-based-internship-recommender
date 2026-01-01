import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Container,
    Grid,
    Paper,
    Button,
    AppBar,
    Toolbar,
    // --- NEW IMPORTS FOR MOBILE MENU ---
    IconButton,
    Menu,
    MenuItem,
    Stack,
    // --- NEW IMPORTS FOR DARK MODE ---
    // Removed Switch since we are now using a fixed IconButton toggle
} from "@mui/material";
// --- NEW IMPORT FOR DARK MODE ICONS ---
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import MenuIcon from "@mui/icons-material/Menu"; // Import MenuIcon
import { useNavigate } from "react-router-dom";
import AshokChakra from "../assets/Ashoka_Chakra.svg";
import { styled } from "@mui/material/styles";
import twentyOne from "../assets/21.png";
import job from "../assets/job.png";
import family from "../assets/family.png";
import education from "../assets/education.png";
import wallet from "../assets/wallet.png";
import coin from "../assets/coin.png";
import check from "../assets/check.png";
import success from "../assets/success.png";


// I'm assuming you have appropriate icons (like Material Icons or Font Awesome)
// for the steps, but since I can't access them, I'll use placeholders.
// For the final code, you should replace <i className="..." /> with actual icon components.

const CORE_NAVY_COLOR = "hsla(216, 90%, 39%, 1.00)";

// --- Define Base Colors for Theme Switching ---
const LIGHT_BG = "#f5f7fb";
const DARK_BG = "#121212";
const LIGHT_PAPER_BG = "#fff";
const DARK_PAPER_BG = "#1e1e1e";
const LIGHT_TEXT = "#000";
const DARK_TEXT = "#fff";
// ---------------------------------------------

// --- NEW DATA: Eligibility & Benefits (Fully Responsive) ---
const eligibilityData = [
    {
        title: "Age",
        value: "21-24 Years",
        icon: <i className="fa-solid fa-calendar" />, // Placeholder Icon
        note: <img
            src={twentyOne}
            alt="twentyOne"
            style={{ width: 80, height: 80 }}
        />,

    },
    {
        title: "Job Status",
        value: "Not Employed Full Time",
        icon: <i className="fa-solid fa-briefcase" />, // Placeholder Icon
        note: <img
            src={job}
            alt="job"
            style={{ width: 80, height: 80 }}
        />,
    },
    {
        title: "Education",
        value: "Not Enrolled Full Time",
        icon: <i className="fa-solid fa-graduation-cap" />, // Placeholder Icon
        note: <img
            src={education}
            alt="education"
            style={{ width: 80, height: 80 }}
        />,
    },
    {
        title: "Family",
        value: "No one is earning more than ₹8 Lakhs PA",
        icon: <i className="fa-solid fa-user-group" />, // Placeholder Icon
        note: <img
            src={family}
            alt="family"
            style={{ width: 80, height: 80 }}
        />,
    },
];

const benefitsData = [
    {
        title: "Real-life Experience",
        value: "12 months real-life experience in India's top companies",
        icon: <i className="fa-solid fa-briefcase" />, // Placeholder Icon
        note: <img
            src={job}
            alt="job"
            style={{ width: 80, height: 80 }}
        />,
    },
    {
        title: "Financial Assistance",
        value: "Monthly assistance of ₹4500 by Government of India and ₹500 by industry",
        icon: <i className="fa-solid fa-wallet" />, // Placeholder Icon
        note: <img
            src={wallet}
            alt="wallet"
            style={{ width: 80, height: 80 }}
        />,
    },
    {
        title: "One-time Grant",
        value: "One-time Grant of ₹6000 for incidentals",
        icon: <i className="fa-solid fa-coins" />, // Placeholder Icon
        note: <img
            src={coin}
            alt="coin"
            style={{ width: 80, height: 80 }}
        />,
    },
    {
        title: "Sector Selectivity",
        value: "Select from Various Sectors and from top Companies of India",
        icon: <i className="fa-solid fa-cubes" />, // Placeholder Icon
        note: <img
            src={check}
            alt="check"
            style={{ width: 80, height: 80 }}
        />,
    },
];

const EligibilityCardStyles = {
    card: (isDarkMode) => ({
        p: 3,
        borderRadius: "12px",
        transition: "box-shadow 0.3s, transform 0.3s",
        border: "1px solid #e0e0e0",
        height: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        bgcolor: isDarkMode ? DARK_PAPER_BG : LIGHT_PAPER_BG, // Theme-dependent background
        width: "12vw",

        "&:hover": {
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            transform: "translateY(-5px)",
            backgroundColor: isDarkMode ? "#333" : "hsla(216, 90%, 95%, 1.00)",
        },
    }),
    // Styling for Eligibility icons (Orange theme)
    iconBox: (isBenefit = false) => ({
        width: isBenefit ? 50 : 80,
        height: isBenefit ? 50 : 80,
        borderRadius: '50%',
        bgcolor: "hsla(216, 90%, 90%, 1.00)", // Very light orange/yellow background
        color: CORE_NAVY_COLOR,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: isBenefit ? '1.5rem' : '2rem',
        mb: 2,

    }),
    // Styling for Benefits icons (Blue theme)
    benefitIconBox: {
        width: 70,
        height: 70,
        borderRadius: '50%',
        bgcolor: 'hsla(216, 90%, 39%, 0.1)', // Light Navy background
        color: CORE_NAVY_COLOR,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        mb: 2,
    },
    title: {
        fontWeight: "bold",
        fontSize: "1.1rem",
        color: CORE_NAVY_COLOR,
        mb: 1,
    },
    value: (isDarkMode) => ({
        color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary', // Adjusted for better dark mode visibility
        fontSize: '0.95rem',
        lineHeight: 1.5,
        minHeight: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }),
    eligibilitySection: (isDarkMode) => ({
        bgcolor: isDarkMode ? DARK_BG : LIGHT_PAPER_BG, // Theme-dependent background
        py: 5,
    }),
};
// ------------------------
// --- SUCCESS STORIES DATA ---
const successStories = [
    {
        name: "Priya Sharma",
        title: "Software Engineer",
        company: "Google India",
        quote:
            "\"The PM Internship gave me hands-on experience that no classroom could provide. I learned real world skills and got placed at Google right after graduation.\"",
        note:<img
            src={success}
            alt="success"
            style={{ width: 80, height: 80 }}
        />,
    },
    {
        name: "Rahul Verma",
        title: "Product Manager",
        company: "Flipkart",
        quote:
            "\"Working with industry experts during my internship opened up career paths I never imagined. The mentorship and exposure were invaluable.\"",
        note:<img
            src={success}
            alt="success"
            style={{ width: 80, height: 80 }}
        />,
    },
    {
        name: "Anita Patel",
        title: "Data Analyst",
        company: "Microsoft India",
        quote:
            "\"The structured program helped me transition from theoretical knowledge to practical application. I'm now working on cutting edge AI projects at Microsoft.\"",
        note:<img
            src={success}
            alt="success"
            style={{ width: 80, height: 80 }}
        />,
    },
    {
        name: "Vikram Singh",
        title: "Marketing Specialist",
        company: "Amazon",
        quote:
            "\"The internship honed my strategic thinking and campaign management skills. Now, I'm driving successful marketing initiatives at Amazon.\"",
        note:<img
            src={success}
            alt="success"
            style={{ width: 80, height: 80 }}
        />,
    },
    {
        name: "Deepa Devi",
        title: "UX Designer",
        company: "Adobe",
        quote:
            "\"Learning from senior designers and applying principles to real products was incredible. My internship directly led to my role at Adobe.\"",
        note:<img
            src={success}
            alt="success"
            style={{ width: 80, height: 80 }}
        />,
    },
    {
        name: "Arjun Reddy",
        title: "Operations Lead",
        company: "Ola Cabs",
        quote:
            "\"The fast-paced environment of the internship taught me invaluable lessons in logistics and operations. I'm thriving at Ola Cabs thanks to that foundation.\"",
        note:<img
            src={success}
            alt="success"
            style={{ width: 80, height: 80 }}
        />,
    },
];

const NavyButtonStyles = {
    backgroundColor: CORE_NAVY_COLOR,
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

const dashboardBtn = {
    backgroundColor: "#fff",
    color: CORE_NAVY_COLOR,
    border: `2px solid ${CORE_NAVY_COLOR}`,
    textTransform: "none",
    fontWeight: "bold",
    px: 3,
    py: 1,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
        backgroundColor: "hsla(216, 90%, 20%, 1.00)",
        transform: "translateY(-5px)",
        border: "2px solid hsla(216, 90%, 20%, 1.00)",
        boxShadow: "0 4px 8px hsla(0, 0%, 0%, 0.25)",
        color: "#fff",
    },
};

// --- SUCCESS STORY CARD & CAROUSEL STYLES ---
const SuccessStoryStyles = {
    card: (isDarkMode) => ({
        p: 3,
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
        // --- RESPONSIVE FIX 2: Fixed width for mobile cards to enable smooth scroll ---
        minWidth: { xs: "90vw", sm: "400px", md: "380px" },
        maxWidth: { xs: "90vw", sm: "400px", md: "380px" },
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        mx: 2,
        bgcolor: isDarkMode ? DARK_PAPER_BG : LIGHT_PAPER_BG, // Theme-dependent background
        flexShrink: 0,
    }),
    avatar: {
        width: 80,
        height: 80,
        borderRadius: "50%",
        mb: 2,
        border: `2px solid ${CORE_NAVY_COLOR}`,
        objectFit: 'cover',
    },
    name: {
        fontWeight: "bold",
        fontSize: "1.1rem",
        mb: 0.5,
    },
    company: {
        color: CORE_NAVY_COLOR,
        fontWeight: "bold",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    quote: (isDarkMode) => ({
        fontStyle: "italic",
        color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary', // Theme-dependent quote color
        mt: 2,
        fontSize: "0.95rem",
        lineHeight: 1.6,
    }),
    carouselContainer: {
        overflow: "hidden",
        width: "100%",
    },
};

// 1. Define the AnimatedCarouselInner styled component
const totalItems = successStories.length;
const scrollSpeed = totalItems * 5;

const AnimatedCarouselInner = styled(Box)({
    display: "flex",
    // The actual width is dynamically calculated by the fixed min/max-width of the cards * 2 * number of cards
    width: "max-content",

    // Define the keyframes here for continuous left scroll
    "@keyframes scrollLeft": {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-50%)" },
    },

    // Apply the animation
    animation: `scrollLeft ${scrollSpeed}s linear infinite`,

    // Pause animation on hover
    "&:hover": {
        animationPlayState: "paused",
    },
});

// --- FOOTER DATA & STYLES ---

const FooterStyles = {
    mainFooter: {
        bgcolor: CORE_NAVY_COLOR,
        color: "#fff",
        py: 6,
    },
    heading: {
        fontWeight: "bold",
        fontSize: "1.1rem",
        mb: 2,
        color: "rgba(255, 255, 255, 0.9)",
    },
    link: {
        display: "block",
        textDecoration: "none",
        color: "rgba(255, 255, 255, 0.7)",
        mb: 1,
        fontSize: "0.9rem",
        transition: "color 0.2s",
        "&:hover": {
            color: "#fff",
        },
    },
    linkWithIcon: {
        display: "flex",
        alignItems: "flex-start",
        textDecoration: "none",
        color: "rgba(255, 255, 255, 0.7)",
        mb: 1.5,
        fontSize: "0.9rem",
        transition: "color 0.2s",
        "&:hover": {
            color: "#fff",
        },
        "& i": {
            mr: 1,
            mt: "3px",
            fontSize: "0.8rem",
        }
    },
    copyrightBar: {
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        pt: 2,
        mt: 4,
        fontSize: "0.85rem",
        color: "rgba(255, 255, 255, 0.7)",
    },
    govLogo: {
        width: 30,
        height: 30,
        mr: 1,
        filter: "invert(100%)",
    }
};

const quickLinks = [
    { label: "Guidelines & Instructions", icon: "fa-solid fa-file-alt", href: "#" },
    { label: "Eligibility Criteria", icon: "fa-solid fa-graduation-cap", href: "#" },
    { label: "Application Process", icon: "fa-solid fa-list-check", href: "#" },
    { label: "Frequently Asked Questions", icon: "fa-solid fa-circle-question", href: "#" },
];

const governmentLinks = [
    { label: "India.gov.in", href: "https://www.india.gov.in" },
    { label: "Ministry of Corporate Affairs", href: "https://www.mca.gov.in" },
    { label: "Digital India", href: "https://digitalindia.gov.in" },
    { label: "MyGov.in", href: "https://www.mygov.in" },
];

// --- END FOOTER DATA & STYLES ---


export default function HomePage() {
    const navigate = useNavigate();
    // --- NEW STATE FOR DARK MODE ---
    const [isDarkMode, setIsDarkMode] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
    // --- NEW STATE FOR MOBILE MENU ---
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // --- NEW FUNCTION TO HANDLE DARK MODE TOGGLE ---
    const handleChangeMode = () => {
        setIsDarkMode((prev) => !prev);
    };
    // -----------------------------------------------

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleNavClick = (path) => {
        navigate(path);
        handleClose();
    };
    // ---------------------------------

    // Prevent back nav after logout
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    }, []);

    // Navigation Items for both desktop and mobile menu
    const navItems = [
        { label: "Register", path: "/signup" },
        { label: "Login", path: "/login" },
        { label: " Select Language", path: "/login" },
    ]

    // Determine AppBar colors based on mode
    const appBarBg = isDarkMode ? DARK_PAPER_BG : LIGHT_PAPER_BG;
    const appBarColor = isDarkMode ? DARK_TEXT : LIGHT_TEXT;
    const mainBg = isDarkMode ? DARK_BG : LIGHT_BG;

    // Estimate AppBar height for fixed positioning below it.
    // The Toolbar has py: 1 (8px padding top/bottom) and the image is 60px height.
    const appBarHeight = 60 + 8 * 2; // ~76px to 80px depending on default font size. Use 80px as safe estimate.

    return (
        // Use mainBg for the overall page background
        <Box sx={{ minHeight: "100vh", bgcolor: mainBg, color: appBarColor }}>

            {/* --- START FLOATING DARK MODE TOGGLE --- */}
            {/* Placed outside the AppBar, fixed position, 10px below the calculated AppBar height */}
            <IconButton
                aria-label="toggle light/dark mode"
                onClick={handleChangeMode}
                sx={{
                    position: 'fixed',
                    // Use a safe estimate for the vertical position
                    top: `${appBarHeight + 20}px`,
                    right: { xs: 16, md: 32 }, // Adjusted for responsiveness
                    zIndex: 1100, // Above content, below AppBar (1200)
                    bgcolor: isDarkMode ? "#fff" : LIGHT_PAPER_BG,
                    color: isDarkMode ? "hsla(216, 90%, 20%, 1.00)"  : CORE_NAVY_COLOR,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        bgcolor: "hsla(216, 90%, 20%, 1.00)",
                        color: DARK_TEXT,
                        transform: 'scale(1.05)',
                    },
                    p: 1.5, // Standard padding for a prominent button
                    borderRadius: '50%',
                    display: { xs: 'block', md: 'block' } // Always visible
                }}
            >
                {/* The icon changes based on the current mode */}
                {isDarkMode ? <LightModeIcon fontSize="large" /> : <DarkModeIcon fontSize="large" />}
            </IconButton>
            {/* --- END FLOATING DARK MODE TOGGLE --- */}

            {/* Navbar */}
            <AppBar
                position="sticky"
                sx={{
                    backgroundColor: appBarBg,
                    color: appBarColor,
                    px: 4,
                    py: 1,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    zIndex: 1200, // Ensure AppBar is on top
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    {/* Left: Logo + Title (Always visible) */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {/* Make the Logo/Title clickable for Home navigation */}
                        <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => navigate("/")}>
                            <img
                                src={AshokChakra}
                                alt="Ashok Chakra"
                                style={{ width: 200, height: 60 }}
                            />
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}> {/* Hide title details on very small screens */}
                                <Typography variant="h6" fontWeight="bold" color={appBarColor}>
                                    PM Internship Scheme
                                </Typography>
                                <Typography variant="body2" color={appBarColor}>
                                    Ministry of Corporate Affairs, Government of India
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Right: Buttons/Menu */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                        {/* Desktop Navigation (Hidden on xs) */}
                        {/* The logic for the Switch inside the toolbar is removed here */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.label}
                                    variant="outlined"
                                    sx={{
                                        ...NavyButtonStyles,
                                        color: "#fff",
                                        borderColor: isDarkMode ? DARK_TEXT : CORE_NAVY_COLOR,
                                    }}
                                    onClick={() => navigate(item.path)}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>

                        {/* Mobile Hamburger Menu Button (Visible on xs, hidden on md and up) */}
                        <IconButton
                            aria-label="menu"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{ display: { xs: 'block', md: 'none' }, color: CORE_NAVY_COLOR }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Menu Dropdown */}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                {/* Also removed the in-navbar Switch from here */}
                {navItems.map((item) => (
                    <MenuItem key={item.label} onClick={() => handleNavClick(item.path)}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>

            {/* Hero Section ... (content remains the same) */}
            <Box
                sx={{
                    bgcolor: CORE_NAVY_COLOR,
                    color: "#fff",
                    py: 6,
                    position: "relative",
                }}
            >
                <Container>
                    {/* ... Hero Content ... */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                        }}
                    >
                        {/* Left Column: Text and CTA Buttons */}
                        <Box
                            sx={{
                                maxWidth: { xs: "100%", md: "50%" },
                                mb: { xs: 4, md: 0 },
                                pr: { md: 4 },
                                textAlign: { xs: 'center', md: 'left' }
                            }}
                        >
                            <Typography variant="h3" fontWeight="bold" gutterBottom>
                                Bridge the Gap Between Learning and Industry
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4 }}>
                                Join India&apos;s flagship internship program and gain hands-on
                                experience with the country&apos;s leading companies. Get paid
                                while you learn and build your career foundation.
                            </Typography>

                            {/* CTA Buttons - Responsive stack/row */}
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    justifyContent: { xs: 'center', md: 'flex-start' },
                                    flexDirection: { xs: 'column', sm: 'row' }
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{ ...dashboardBtn }}
                                    onClick={() => navigate("/signup")}
                                    endIcon={
                                        <Box component="span" sx={{ fontSize: "1.2rem" }}>
                                            &rarr;
                                        </Box>
                                    }
                                >
                                    Register Now
                                </Button>
                                {/* <Button
                                    variant="outlined"
                                    sx={{ ...dashboardBtn }}
                                >
                                    Browse Internships
                                </Button> */}
                            </Box>
                        </Box>

                        {/* Right Column: Stats Section */}
                        <Box
                            sx={{
                                width: { xs: "100%", md: "initial" },
                            }}
                        >
                            <Grid container spacing={2} sx={{ width: "100%" }}>
                                {" "}
                                {/* Adjusted spacing for tighter grid */}
                                {[
                                    {
                                        label: "Registered Candidates",
                                        value: "1,25,000",
                                        icon: <i className="fa-solid fa-user-group" />,
                                    },
                                    {
                                        label: "Partner Companies",
                                        value: "2,500",
                                        icon: <i className="fa-solid fa-building" />,
                                    },
                                    {
                                        label: "Active Internships",
                                        value: "15,000",
                                        icon: <i className="fa-solid fa-briefcase" />,
                                    },
                                    {
                                        label: "Placement Success",
                                        value: "87%",
                                        icon: <i className="fa-solid fa-chart-line" />,
                                    },
                                ].map((stat, i) => (
                                    // Stats remain 2 per row (xs={6})
                                    <Grid item xs={6} key={i}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                padding: "1.5rem",
                                                textAlign: "left",
                                                borderRadius: "0.75rem",
                                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                minHeight: "120px",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                color: "#fff",
                                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                                transition:
                                                    "background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                                                "&:hover": {
                                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                                    borderColor: "rgba(255, 255, 255, 0.5)",
                                                    transform: "scale(1.03)",
                                                    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.3)",
                                                },
                                            }}
                                        >
                                            {/* Icon placeholder (replace with actual icons) */}
                                            <Box sx={{ mb: 1.5, fontSize: 30, opacity: 0.8 }}>
                                                {stat.icon}
                                            </Box>
                                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                                {stat.value}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="#fff"
                                                sx={{ opacity: 0.8 }}
                                            >
                                                {stat.label}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Box>
            {/* END Hero Section */}

            {/* --- START Eligibility & Benefits Section (New Content) --- */}
            <Container sx={EligibilityCardStyles.eligibilitySection(isDarkMode)}>
                <Grid container spacing={4}>
                    {/* Left Side: Eligibility */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" fontWeight="bold" textAlign="center" sx={{ mb: 4, color: appBarColor }}>
                            Are you <Box component="span" color={CORE_NAVY_COLOR}>Eligible?</Box>
                        </Typography>
                        <Grid container spacing={3}>
                            {eligibilityData.map((item, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Paper sx={EligibilityCardStyles.card(isDarkMode)} elevation={1}>
                                        <Box sx={EligibilityCardStyles.iconBox()}>
                                            {/* Special rendering for Age to match image */}
                                            {item.note}
                                        </Box>
                                        <Typography sx={EligibilityCardStyles.title}>
                                            {item.title}
                                        </Typography>
                                        <Typography sx={EligibilityCardStyles.value(isDarkMode)}>
                                            {item.value}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Right Side: Core Benefits */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" fontWeight="bold" textAlign="center" sx={{ mb: 4, color: appBarColor }}>
                            Core Benefits for <Box component="span" color={CORE_NAVY_COLOR}>PM Internship Scheme</Box>
                        </Typography>
                        <Grid container spacing={3}>
                            {benefitsData.map((item, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Paper sx={EligibilityCardStyles.card(isDarkMode)} elevation={1}>
                                        <Box sx={EligibilityCardStyles.benefitIconBox}>
                                            {item.note}
                                        </Box>
                                        <Typography sx={EligibilityCardStyles.title}>
                                            {item.title}
                                        </Typography>
                                        <Typography sx={EligibilityCardStyles.value(isDarkMode)} fontWeight="normal">
                                            {item.value}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            {/* --- END Eligibility & Benefits Section --- */}

            {/* --- START Success Stories Section (Auto-Scrolling) --- */}
            {/* Container needs overflowX: 'hidden' to hide the massive scrolling component */}
            <Box sx={{ py: 8, overflowX: 'hidden', bgcolor: mainBg, color: appBarColor }}>
                <Container>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        textAlign="center"
                        gutterBottom
                    >
                        Success Stories
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        textAlign="center"
                        color={isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary'}
                        sx={{ mb: 6 }}
                    >
                        Hear from our successful interns who transformed their careers
                    </Typography>
                </Container>

                {/* Outer Box to wrap the scrolling content, allowing it to overflow the centered Container */}
                <Box sx={SuccessStoryStyles.carouselContainer}>
                    <AnimatedCarouselInner sx={{
                        // --- RESPONSIVE FIX 3: Center the visible cards on mobile ---
                        justifyContent: { xs: 'flex-start', md: 'flex-start' },
                    }}>
                        {[...successStories, ...successStories].map((story, index) => (
                            <Paper sx={SuccessStoryStyles.card(isDarkMode)} key={index} elevation={1}>

                                {/* Avatar */}
                                <Box sx={EligibilityCardStyles.iconBox()}>
                                            {/* Special rendering for Age to match image */}
                                            {story.note}
                                        </Box>

                                {/* Name and Title */}
                                <Typography variant="h6" sx={SuccessStoryStyles.name} color={isDarkMode ? DARK_TEXT : LIGHT_TEXT}>
                                    {story.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {story.title}
                                </Typography>

                                {/* Company (link) */}
                                <Typography
                                    variant="body2"
                                    component="a"
                                    href="#"
                                    sx={SuccessStoryStyles.company}
                                >
                                    {story.company}
                                </Typography>

                                {/* Quote */}
                                <Typography variant="body2" sx={SuccessStoryStyles.quote(isDarkMode)}>
                                    {story.quote}
                                </Typography>
                            </Paper>
                        ))}
                    </AnimatedCarouselInner>
                </Box>
            </Box>
            {/* --- END Success Stories Section --- */}

            {/* --- START FOOTER SECTION --- */}
            {/* Footer already uses CORE_NAVY_COLOR, so no changes needed here for Dark Mode */}
            <Box component="footer" sx={FooterStyles.mainFooter}>
                <Container>
                    <Grid container spacing={4}>

                        {/* Column 1: PM Internship Scheme */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography sx={FooterStyles.heading}>
                                PM Internship Scheme
                            </Typography>
                            <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ mb: 2 }}>
                                Bridging the gap between academic learning and industry requirements through quality internship opportunities in India's leading companies.
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <img
                                    src={AshokChakra}
                                    alt="Ashok Stambh"
                                    style={FooterStyles.govLogo}
                                />
                                <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                                    Ministry of Corporate Affairs
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Column 2: Quick Links - Stacked on XS, side-by-side on SM+ */}
                        <Grid item xs={6} sm={6} md={3}>
                            <Typography sx={FooterStyles.heading}>
                                Quick Links
                            </Typography>
                            {quickLinks.map((link, index) => (
                                <Box
                                    component="a"
                                    href={link.href}
                                    key={index}
                                    sx={FooterStyles.linkWithIcon}
                                >
                                    <i className={link.icon} />
                                    {link.label}
                                </Box>
                            ))}
                        </Grid>

                        {/* Column 3: Support - Stacked on XS, side-by-side on SM+ */}
                        <Grid item xs={6} sm={6} md={3}>
                            <Typography sx={FooterStyles.heading}>
                                Support
                            </Typography>
                            <Box sx={FooterStyles.linkWithIcon}><i className="fa-solid fa-envelope" /> support@pminternship.mca.gov.in</Box>
                            <Box sx={FooterStyles.linkWithIcon}><i className="fa-solid fa-phone" /> 1800-123-456 (Toll Free)</Box>
                            <Box sx={FooterStyles.linkWithIcon}><i className="fa-solid fa-location-dot" />
                                <Box>
                                    Ministry of Corporate Affairs<br />
                                    Shastri Bhawan, New Delhi - 110001
                                </Box>
                            </Box>
                        </Grid>

                        {/* Column 4: Government Links */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography sx={FooterStyles.heading}>
                                Government Links
                            </Typography>
                            {governmentLinks.map((link, index) => (
                                <Box
                                    component="a"
                                    href={link.href}
                                    key={index}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={FooterStyles.link}
                                >
                                    {link.label}
                                </Box>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Copyright Bar */}
                    <Box sx={FooterStyles.copyrightBar}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
                                <Typography variant="body2" component="span">
                                    © 2024 Government of India. All rights reserved.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} sx={{
                                display: 'flex',
                                gap: 3,
                                order: { xs: 1, md: 2 },
                                mb: { xs: 2, md: 0 },
                                justifyContent: { xs: 'flex-start', md: 'flex-end' }
                            }}>
                                <Box component="a" href="#" sx={FooterStyles.link} style={{ display: 'inline' }}>Privacy Policy</Box>
                                <Box component="a" href="#" sx={FooterStyles.link} style={{ display: 'inline' }}>Terms of Use</Box>
                                <Box component="a" href="#" sx={FooterStyles.link} style={{ display: 'inline' }}>Accessibility</Box>
                                <Box component="a" href="#" sx={FooterStyles.link} style={{ display: 'inline' }}>Sitemap</Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
