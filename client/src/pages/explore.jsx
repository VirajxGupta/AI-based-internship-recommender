import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Avatar,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const skills = [
  "Web Developer", "React", "Next.js", "HTML", "CSS", "JavaScript", "Node.js", "Python", "Django",
  "Full Stack Development", "Frontend Development", "Backend Development", "Data Science",
  "Machine Learning", "Artificial Intelligence", "Data Analysis", "SQL", "R", "Business Intelligence",
  "Content Writing", "Social Media", "Graphic Design", "Video Editing", "UI/UX Design",
  "Digital Marketing", "SEO", "Copywriting", "Research", "Business Development", "Market Research",
  "Human Resources", "Finance", "Project Management", "Operations Management", "Sales"
];

const sectors = [
  "Technology", "Healthcare", "Education", "Finance", "Marketing", "Government", "Biotechnology",
  "Pharmaceuticals", "Medical Devices", "Telehealth", "Online Learning", "Academic Research", "Banking",
  "Investment Banking", "Accounting", "Financial Planning", "Advertising", "Public Relations", "Non-profit",
  "Consulting", "Media & Entertainment", "Manufacturing"
];

const internshipTypes = ["Hybrid", "Onsite", "Remote"];

async function getInternshipDetails(id) {
  try {
    const docRef = doc(db, "internships", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching internship details:", error);
    return null;
  }
}

export default function Explore() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [internshipType, setInternshipType] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const [openSkillsDialog, setOpenSkillsDialog] = useState(false);
  const [dialogSkills, setDialogSkills] = useState([]);

  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  const [openResultsDialog, setOpenResultsDialog] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreSkills = (internship) => {
    setDialogSkills(internship.skills || []);
    setOpenSkillsDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenSkillsDialog(false);
    setDialogSkills([]);
  };

  const handleOpenDetailDialog = (internship) => {
    setSelectedInternship(internship);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setSelectedInternship(null);
    setOpenDetailDialog(false);
  };

  const handleGetRecommendations = async () => {
    if (selectedSkills.length === 0 && selectedSectors.length === 0 && !internshipType) {
      alert("Please select at least one skill, sector, or internship type!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        "https://pulastya0-sih-ml-backend.hf.space/profile-recommendations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skills: selectedSkills, sectors: selectedSectors, internshipType }),
        }
      );
      if (!res.ok) throw new Error("Failed to fetch internships from the backend.");
      const data = await res.json();
      const recommendations = Array.isArray(data) ? data : data.recommendations || [];
      const fullData = await Promise.all(
        recommendations.map(async (rec) => {
          const details = await getInternshipDetails(rec.internship_id);
          return { ...details, score: rec.score };
        })
      );
      setResults(fullData.filter((item) => item !== null));
      setOpenResultsDialog(true);
      setShowMore(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => navigate("/login");
  const toggleSkill = (skill) =>
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  const toggleSector = (sector) =>
    setSelectedSectors((prev) => (prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector]));

  const filteredSkills = skills.filter((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredSectors = sectors.filter((sector) => sector.toLowerCase().includes(searchTerm.toLowerCase()));

  const paperStyle = {
    p: 3,
    borderRadius: 3,
    border: "1px solid rgba(0,0,0,0.1)",
    position: "relative",
    transition: "transform 0.25s, box-shadow 0.25s",
    "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" },
  };

  const renderInternshipCard = (internship) => (
    <Paper key={internship.id || Math.random()} sx={paperStyle}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Chip
          label={internship.stipend && Number(internship.stipend) > 0 ? "Paid Internship" : "Unpaid Internship"}
          size="small"
          sx={{
            bgcolor: internship.stipend && Number(internship.stipend) > 0 ? "rgba(0,128,0,0.1)" : "rgba(255,0,0,0.1)",
            color: internship.stipend && Number(internship.stipend) > 0 ? "green" : "red",
            fontWeight: "bold",
          }}
        />
        {internship.score !== undefined && (
          <Tooltip
            title={
              <Box
                sx={{
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.95)",
                  borderRadius: 2,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  minWidth: 220,
                  textAlign: "center",
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold" color="#1a73e8">
                  {internship.title || "Internship Title"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {internship.companyName || "Company Name"}
                </Typography>
                <Typography variant="body2" fontWeight="bold" sx={{ mt: 1, color: "#135ec2" }}>
                  This internship matches {(internship.score * 100).toFixed(1)}% with your skills!
                </Typography>
              </Box>
            }
            arrow
            placement="top"
          >
            <Box sx={{ position: "relative", display: "inline-flex", width: 50, height: 50 }}>
              <CircularProgress
                variant="determinate"
                value={internship.score * 100}
                size={50}
                thickness={5}
                sx={{ color: "#1a73e8" }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" component="div" color="textPrimary" fontWeight="bold">
                  {`${(internship.score * 100).toFixed(1)}%`}
                </Typography>
              </Box>
            </Box>
          </Tooltip>
        )}
      </Box>

      <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
        {internship.title || "Title not available"}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        <strong>Company : </strong> {internship.companyName || "Company not available"}
      </Typography>

      {internship.locationCity && (
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationOnIcon sx={{ fontSize: 18, mr: 0.5, color: "#1a73e8" }} />
          <strong>Location : </strong>{internship.locationCity}
        </Typography>
      )}

      {internship.duration && (
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <AccessTimeIcon sx={{ fontSize: 18, mr: 0.5, color: "#1a73e8" }} />
          <strong>Duration : </strong>{internship.duration} months
        </Typography>
      )}

      <Typography variant="subtitle2" fontWeight="bold" color="#1a73e8">
        Ends On: {internship.endDate 
          ? new Date(internship.endDate).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "No End Date"}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography
          variant="body2"
          sx={{ color: internship.stipend && Number(internship.stipend) > 0 ? "green" : "red", fontWeight: "bold" }}
        >
          Stipend : {internship.stipend && Number(internship.stipend) > 0 ? `₹${internship.stipend}/month` : "Unpaid"}
        </Typography>
      </Box>

      {internship.skills?.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
            <strong>Skills : </strong>
            {internship.skills.slice(0, isSmallScreen ? 3 : internship.skills.length).map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                size="small"
                color="primary"
                variant="outlined"
                sx={{
                  borderColor: "rgba(0,0,0,0.1)",
                  bgcolor: "rgba(25, 118, 210, 0.05)",
                  fontWeight: "bold",
                }}
              />
            ))}
            {internship.skills.length > (isSmallScreen ? 3 : internship.skills.length) && (
              <Chip
                label={`+${internship.skills.length - (isSmallScreen ? 3 : internship.skills.length)} more`}
                size="small"
                variant="outlined"
                icon={<ArrowDropDownIcon />}
                onClick={() => handleShowMoreSkills(internship)}
                sx={{
                  borderColor: "rgba(0,0,0,0.1)",
                  bgcolor: "rgba(25, 118, 210, 0.05)",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              />
            )}
          </Stack>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" sx={{ mr: 1 }} onClick={() => handleOpenDetailDialog(internship)}>
          View Details
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "#1a73e8", "&:hover": { bgcolor: "#135ec2" } }}
          onClick={() => navigate("/apply")}
        >
          Apply
        </Button>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #1e3c72, #2a5298)" }}>
      <AppBar position="sticky" sx={{ background: "#1e3c72", mb: 4 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate("/home")}>
              Home
            </Button>
            <Button color="inherit" startIcon={<InfoIcon />} onClick={() => navigate("/about")}>
              About
            </Button>
            <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Paper sx={{ p: 4, borderRadius: 4, textAlign: "center", backdropFilter: "blur(14px)", background: "rgba(255,255,255,0.9)" }}>
          <Avatar sx={{ bgcolor: "primary.main", width: 60, height: 60, margin: "0 auto", mb: 2 }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            Tell Us About Yourself
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Help us find the perfect internship matches for you ✨
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Your Skills
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} />, sx: { width: 250 } }}
            />
          </Box>

          <Grid container spacing={1} sx={{ mb: 3 }}>
            {filteredSkills.map((skill) => (
              <Grid item key={skill}>
                <Chip
                  label={skill}
                  clickable
                  color={selectedSkills.includes(skill) ? "primary" : "default"}
                  onClick={() => toggleSkill(skill)}
                />
              </Grid>
            ))}
          </Grid>

          <Typography variant="subtitle1" align="left" fontWeight="bold" sx={{ mb: 1 }}>
            Interested Sectors
          </Typography>
          <Grid container spacing={1} sx={{ mb: 3 }}>
            {filteredSectors.map((sector) => (
              <Grid item key={sector}>
                <Chip
                  label={sector}
                  clickable
                  color={selectedSectors.includes(sector) ? "primary" : "default"}
                  onClick={() => toggleSector(sector)}
                />
              </Grid>
            ))}
          </Grid>

          <TextField
            select
            label="Internship Type"
            value={internshipType}
            onChange={(e) => setInternshipType(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
          >
            {internshipTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            size="large"
            onClick={handleGetRecommendations}
            fullWidth
            sx={{ py: 1.2, fontWeight: "bold", mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Get My Internship Recommendations"}
          </Button>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Paper>
      </Container>

      {/* Skills Dialog */}
      <Dialog open={openSkillsDialog} onClose={handleCloseDialog}>
        <DialogTitle>Skills</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {dialogSkills.map((skill, idx) => (
              <Chip key={idx} label={skill} size="small" variant="outlined" sx={{ mb: 1 }} />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Internship Detail Dialog */}
      <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog} maxWidth="sm" fullWidth>
        {selectedInternship && (
          <>
            <DialogTitle>{selectedInternship.title}</DialogTitle>
            <DialogContent dividers>
              <Typography variant="subtitle1">
                <strong>Company : </strong>{selectedInternship.companyName || "N/A"}
              </Typography>

              {selectedInternship.locationCity && (
                <Typography variant="body2" sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                  <LocationOnIcon sx={{ fontSize: 18, mr: 0.5, color: "#1a73e8" }} />
                  <strong>Location : </strong>{selectedInternship.locationCity}
                </Typography>
              )}

              {selectedInternship.duration && (
                <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <AccessTimeIcon sx={{ fontSize: 18, mr: 0.5, color: "#1a73e8" }} />
                  <strong>Duration : </strong>{selectedInternship.duration} months
                </Typography>
              )}

              {selectedInternship.endDate && (
                <Typography variant="subtitle2" fontWeight="bold" color="#1a73e8">
                  <strong>Ends On: </strong>
                  {new Date(selectedInternship.endDate).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              )}

              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color: selectedInternship.stipend && Number(selectedInternship.stipend) > 0 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                <strong>Stipend : </strong>{selectedInternship.stipend && Number(selectedInternship.stipend) > 0
                  ? `₹${selectedInternship.stipend}/month`
                  : "Unpaid"}
              </Typography>

              {selectedInternship.description && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <strong>Description:</strong> {selectedInternship.description}
                </Typography>
              )}

              {selectedInternship.skills?.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
                    <strong>Skills : </strong>
                    {selectedInternship.skills.map((skill, idx) => (
                      <Chip
                        key={idx}
                        label={skill}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{
                          borderColor: "rgba(0,0,0,0.1)",
                          bgcolor: "rgba(25, 118, 210, 0.05)",
                          fontWeight: "bold",
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailDialog}>Close</Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "#1a73e8", "&:hover": { bgcolor: "#135ec2" } }}
                onClick={() => navigate("/apply")}
              >
                Apply Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Results Dialog */}
      <Dialog open={openResultsDialog} onClose={() => setOpenResultsDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>Recommended Internships</DialogTitle>
        <DialogContent dividers>
          {results && results.length > 0 ? (
            <Stack spacing={2}>
              {results.slice(0, 4).map(renderInternshipCard)}

              {results.length > 4 && (
                <>
                  <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 1, mb: 1 }}>
                    <Button
                      variant="outlined"
                      endIcon={<ArrowDropDownIcon />}
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? "Show Less" : `Show ${results.length - 4} More`}
                    </Button>
                  </Box>

                  {showMore && results.slice(4).map(renderInternshipCard)}
                </>
              )}
            </Stack>
          ) : (
            <Typography>No internships found</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResultsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
