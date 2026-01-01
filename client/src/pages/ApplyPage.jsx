import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Divider,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coverLetter: "",
    skills: "",
    resume: null,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10 MB. Please upload a smaller file.");
        return;
      }
      setError("");
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.resume) {
      setError("Please upload a resume before submitting.");
      return;
    }
    alert("Application submitted ✅");
  };

  return (
    <>
      {/* Top NavBar */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          mb: 3,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 4,
            background: "#f9fbff",
          }}
        >
          {/* Title */}
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#1e3c72" }}
          >
            Internship Application
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            Please provide the following details to apply for this internship.
          </Typography>

          <Divider sx={{ mb: 4 }} />

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            {/* Personal Info */}
            <Box
              sx={{
                background: "#eef3fb",
                p: 3,
                borderRadius: 3,
                mb: 4,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#1e3c72" }}
              >
                Personal Information
              </Typography>

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Full Name *
              </Typography>
              <TextField
                name="name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />

              <Typography variant="subtitle2">Email *</Typography>
              <TextField
                name="email"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
            </Box>

            {/* Professional Info */}
            <Box
              sx={{
                background: "#eef8f2",
                p: 3,
                borderRadius: 3,
                mb: 4,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#1e3c72" }}
              >
                Professional Information
              </Typography>

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Skills
              </Typography>
              <TextField
                name="skills"
                placeholder="e.g., React, Node.js, Python"
                fullWidth
                multiline
                rows={2}
                value={formData.skills}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />

              <Typography variant="subtitle2">Cover Letter</Typography>
              <TextField
                name="coverLetter"
                fullWidth
                multiline
                rows={4}
                value={formData.coverLetter}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
            </Box>

            {/* Resume Upload */}
            <Box
              sx={{
                background: "#fff8e6",
                p: 3,
                borderRadius: 3,
                mb: 4,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#1e3c72" }}
              >
                Attach Resume
              </Typography>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ py: 1.5 }}
              >
                Upload Resume
                <input
                  type="file"
                  hidden
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                />
              </Button>

              <Typography
                variant="body2"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                Please upload a file up to <b>10 MB</b> (.pdf, .doc, .docx)
              </Typography>

              {formData.resume && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected File: {formData.resume.name}
                </Typography>
              )}

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </Box>

            {/* Submit */}
            <Divider sx={{ my: 4 }} />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                "&:hover": {
                  background: "linear-gradient(135deg, #2a5298, #1e3c72)",
                },
              }}
            >
              Submit Application
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
