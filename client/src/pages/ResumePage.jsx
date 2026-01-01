
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Function to fetch internship details from Firebase
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

function ResumePage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Dialog states
  const [openResultsDialog, setOpenResultsDialog] = useState(false);
  const [results, setResults] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [openSkillsDialog, setOpenSkillsDialog] = useState(false);
  const [dialogSkills, setDialogSkills] = useState([]);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCardClick = (method) => {
    setSelectedMethod(method);
  };

  const handleShowMoreSkills = (internship) => {
    setDialogSkills(internship.skills || []);
    setOpenSkillsDialog(true);
  };

  const handleCloseSkillsDialog = () => {
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

  const handleResumeUploadAndExtract = async () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.pdf,.doc,.docx';
  input.style.display = 'none';
  
  input.onchange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      showNotification(`Processing: ${file.name}`);
      setLoading(true);
      
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        // Add additional parameters to FormData if backend expects them
        formData.append('get_recommendations', 'true');
        // formData.append('user_preferences', JSON.stringify({}));
        
        const response = await fetch('https://pipalskill-sih-ml-backend-resume-scanner.hf.space/resume-content-extractor', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', response.status, errorText);
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('API Response:', result);
        
        // Extract recommendations from response
        const recommendations = result.recommendations || result.data || [];
        
        if (recommendations.length === 0) {
          showNotification('No recommendations found. Try manual entry.');
          return;
        }
        
        // Fetch full internship details from Firebase
        const fullData = await Promise.all(
          recommendations.map(async (rec) => {
            const details = await getInternshipDetails(rec.internship_id);
            return { ...details, score: rec.score };
          })
        );
        
        setResults(fullData.filter((item) => item !== null));
        setOpenResultsDialog(true);
        setShowMore(false);
        showNotification('Recommendations loaded successfully!');
        
      } catch (error) {
        console.error('Error:', error);
        showNotification(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };
  
  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
};

  const handleButtonClick = () => {
    if (selectedMethod === 'manual') {
      navigate("/explore");
    } else if (selectedMethod === 'upload') {
      handleResumeUploadAndExtract();
    }
  };

  const renderInternshipCard = (internship) => (
    <div key={internship.id || Math.random()} style={styles.internshipCard}>
      <div style={styles.cardHeaderRow}>
        <span style={{
          ...styles.badge,
          backgroundColor: internship.stipend && Number(internship.stipend) > 0 ? 'rgba(0,128,0,0.1)' : 'rgba(255,0,0,0.1)',
          color: internship.stipend && Number(internship.stipend) > 0 ? 'green' : 'red'
        }}>
          {internship.stipend && Number(internship.stipend) > 0 ? 'Paid Internship' : 'Unpaid Internship'}
        </span>
        {internship.score !== undefined && (
          <div style={styles.scoreContainer}>
            <div style={styles.scoreCircle}>
              <span style={styles.scoreText}>{(internship.score * 100).toFixed(1)}%</span>
            </div>
            <span style={styles.matchText}>Match</span>
          </div>
        )}
      </div>

      <h3 style={styles.internshipTitle}>{internship.title || "Title not available"}</h3>
      <p style={styles.companyName}>
        <strong>Company:</strong> {internship.companyName || "Company not available"}
      </p>

      {internship.locationCity && (
        <p style={styles.infoRow}>
          📍 <strong>Location:</strong> {internship.locationCity}
        </p>
      )}

      {internship.duration && (
        <p style={styles.infoRow}>
          ⏱️ <strong>Duration:</strong> {internship.duration} months
        </p>
      )}

      <p style={styles.endDate}>
        <strong>Ends On:</strong> {internship.endDate 
          ? new Date(internship.endDate).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "No End Date"}
      </p>

      <p style={{
        ...styles.stipend,
        color: internship.stipend && Number(internship.stipend) > 0 ? 'green' : 'red'
      }}>
        <strong>Stipend:</strong> {internship.stipend && Number(internship.stipend) > 0 ? `₹${internship.stipend}/month` : 'Unpaid'}
      </p>

      {internship.skills?.length > 0 && (
        <div style={styles.skillsContainer}>
          <strong>Skills:</strong>
          <div style={styles.skillsWrapper}>
            {internship.skills.slice(0, 3).map((skill, index) => (
              <span key={index} style={styles.skillChip}>
                {skill}
              </span>
            ))}
            {internship.skills.length > 3 && (
              <span 
                style={{...styles.skillChip, ...styles.moreSkills}}
                onClick={() => handleShowMoreSkills(internship)}
              >
                +{internship.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div style={styles.cardActions}>
        <button 
          style={styles.viewDetailsBtn}
          onClick={() => handleOpenDetailDialog(internship)}
        >
          View Details
        </button>
        <button 
          style={styles.applyBtn}
          onClick={() => navigate("/apply")}
        >
          Apply
        </button>
      </div>
    </div>
  );

  // Inline styles
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Arial, sans-serif'
    },
    toast: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#10b981',
      color: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      display: showToast ? 'block' : 'none'
    },
    appBar: {
      backgroundColor: '#2563eb',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px'
    },
    backButton: {
      marginRight: '12px',
      padding: '8px',
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '20px'
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
      margin: 0
    },
    mainContent: {
      maxWidth: '768px',
      margin: '0 auto',
      padding: '32px 16px'
    },
    centerText: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px'
    },
    cardContainer: {
      display: 'flex',
      gap: '16px',
      marginBottom: '24px',
      flexDirection: window.innerWidth < 640 ? 'column' : 'row'
    },
    card: {
      flex: 1,
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: 'white'
    },
    cardSelected: {
      borderColor: '#3b82f6',
      backgroundColor: '#eff6ff'
    },
    cardHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      textAlign: 'center'
    },
    cardHeaderContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px'
    },
    icon: {
      fontSize: '48px',
      marginBottom: '8px'
    },
    cardTitle: {
      fontWeight: '600',
      margin: 0,
      fontSize: '18px',
      color: '#1f2937',
      marginBottom: '12px'
    },
    cardDescription: {
      fontSize: '14px',
      color: '#6b7280',
      textAlign: 'center',
      lineHeight: '1.5',
      margin: 0
    },
    button: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      marginBottom: '24px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px'
    },
    buttonEnabled: {
      backgroundColor: '#2563eb',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    buttonDisabled: {
      backgroundColor: '#d1d5db',
      color: '#9ca3af',
      cursor: 'not-allowed'
    },
    infoCard: {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    },
    infoCardContent: {
      padding: '24px'
    },
    infoTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '8px'
    },
    infoText: {
      color: '#6b7280',
      margin: 0,
      lineHeight: '1.6'
    },
    // Dialog styles
    dialogOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    dialog: {
      backgroundColor: 'white',
      borderRadius: '12px',
      width: '90%',
      maxWidth: '800px',
      maxHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    dialogTitle: {
      padding: '24px',
      borderBottom: '1px solid #e5e7eb',
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937'
    },
    dialogContent: {
      padding: '24px',
      overflowY: 'auto',
      flex: 1
    },
    dialogActions: {
      padding: '16px 24px',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px'
    },
    dialogButton: {
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    },
    closeButton: {
      backgroundColor: '#e5e7eb',
      color: '#374151'
    },
    // Internship card styles
    internshipCard: {
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid rgba(0,0,0,0.1)',
      marginBottom: '16px',
      backgroundColor: 'white',
      transition: 'transform 0.25s, box-shadow 0.25s',
      cursor: 'default'
    },
    cardHeaderRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px'
    },
    badge: {
      padding: '4px 12px',
      borderRadius: '16px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    scoreContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    scoreCircle: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      border: '4px solid #1a73e8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(26, 115, 232, 0.1)'
    },
    scoreText: {
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#1a73e8'
    },
    matchText: {
      fontSize: '12px',
      color: '#6b7280'
    },
    internshipTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#1f2937'
    },
    companyName: {
      fontSize: '14px',
      marginBottom: '8px',
      color: '#4b5563'
    },
    infoRow: {
      fontSize: '14px',
      marginBottom: '6px',
      color: '#4b5563',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    endDate: {
      fontSize: '14px',
      color: '#1a73e8',
      fontWeight: '500',
      marginBottom: '8px'
    },
    stipend: {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '12px'
    },
    skillsContainer: {
      marginBottom: '16px',
      fontSize: '14px'
    },
    skillsWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px'
    },
    skillChip: {
      padding: '4px 12px',
      borderRadius: '16px',
      backgroundColor: 'rgba(25, 118, 210, 0.05)',
      border: '1px solid rgba(0,0,0,0.1)',
      fontSize: '12px',
      color: '#1a73e8'
    },
    moreSkills: {
      cursor: 'pointer',
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
      fontWeight: '500'
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '8px'
    },
    viewDetailsBtn: {
      padding: '8px 16px',
      borderRadius: '6px',
      border: '1px solid #1a73e8',
      backgroundColor: 'white',
      color: '#1a73e8',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    },
    applyBtn: {
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: '#1a73e8',
      color: 'white',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    },
    showMoreButton: {
      padding: '10px 20px',
      borderRadius: '6px',
      border: '1px solid #1a73e8',
      backgroundColor: 'white',
      color: '#1a73e8',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      marginTop: '16px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '20px',
      height: '20px',
      border: '3px solid rgba(0,0,0,0.1)',
      borderTop: '3px solid #2563eb',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  return (
    <div style={styles.container}>
      {/* Add keyframes for loading spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Toast Notification */}
      <div style={styles.toast}>
        {toastMessage}
      </div>

      {/* App Bar */}
      <div style={styles.appBar}>
        <div style={styles.toolbar}>
          <button 
            style={styles.backButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            onClick={() => navigate(-1)}
          >
            ←
          </button>
          <h1 style={styles.title}>PM Internship Scheme</h1>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.centerText}>
          <h2 style={styles.heading}>
            Choose your preferred method
          </h2>
        </div>

        <div style={styles.cardContainer}>
          {/* Manual Entry Card */}
          <div
            style={{
              ...styles.card,
              ...(selectedMethod === 'manual' ? styles.cardSelected : {})
            }}
            onClick={() => handleCardClick('manual')}
          >
            <div style={styles.cardHeader}>
              <div style={styles.cardHeaderContent}>
                <span style={styles.icon}>✏️</span>
                <h3 style={styles.cardTitle}>Enter Skills Manually</h3>
                <p style={styles.cardDescription}>
                  Fill out a simple form with your skills, preferred sectors, and internship type preferences
                </p>
              </div>
            </div>
          </div>

          {/* Upload Resume Card */}
          <div
            style={{
              ...styles.card,
              ...(selectedMethod === 'upload' ? styles.cardSelected : {})
            }}
            onClick={() => handleCardClick('upload')}
          >
            <div style={styles.cardHeader}>
              <div style={styles.cardHeaderContent}>
                <span style={styles.icon}>📄</span>
                <h3 style={styles.cardTitle}>Upload Your Resume</h3>
                <p style={styles.cardDescription}>
                  Upload your resume and let our system automatically extract your skills and experience
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          style={{
            ...styles.button,
            ...(selectedMethod ? styles.buttonEnabled : styles.buttonDisabled)
          }}
          disabled={!selectedMethod || loading}
          onClick={handleButtonClick}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={styles.loadingSpinner}></span>
              Processing...
            </span>
          ) : (
            selectedMethod === 'manual'
              ? 'Continue with Manual Entry'
              : selectedMethod === 'upload'
              ? 'Continue with Resume Upload'
              : 'Select a method to proceed'
          )}
        </button>

        {/* Information Card */}
        <div style={styles.infoCard}>
          <div style={styles.infoCardContent}>
            <h3 style={styles.infoTitle}>
              Need Help Deciding?
            </h3>
            <p style={styles.infoText}>
              <strong>Manual Entry</strong> gives you full control over your profile. <strong>Resume Upload</strong> automatically extracts your information and provides instant recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Results Dialog */}
      {openResultsDialog && (
        <div style={styles.dialogOverlay}>
          <div style={styles.dialog}>
            <div style={styles.dialogTitle}>Recommended Internships</div>
            <div style={styles.dialogContent}>
              {results && results.length > 0 ? (
                <div>
                  {results.slice(0, 4).map(renderInternshipCard)}
                  
                  {results.length > 4 && (
                    <>
                      <button
                        style={styles.showMoreButton}
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? 'Show Less' : `Show ${results.length - 4} More`}
                        <span style={{ transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                          ▼
                        </span>
                      </button>
                      
                      {showMore && results.slice(4).map(renderInternshipCard)}
                    </>
                  )}
                </div>
              ) : (
                <p>No internships found</p>
              )}
            </div>
            <div style={styles.dialogActions}>
              <button
                style={{ ...styles.dialogButton, ...styles.closeButton }}
                onClick={() => setOpenResultsDialog(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skills Dialog */}
      {openSkillsDialog && (
        <div style={styles.dialogOverlay}>
          <div style={{ ...styles.dialog, maxWidth: '500px' }}>
            <div style={styles.dialogTitle}>Skills</div>
            <div style={styles.dialogContent}>
              <div style={styles.skillsWrapper}>
                {dialogSkills.map((skill, idx) => (
                  <span key={idx} style={styles.skillChip}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div style={styles.dialogActions}>
              <button
                style={{ ...styles.dialogButton, ...styles.closeButton }}
                onClick={handleCloseSkillsDialog}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Internship Detail Dialog */}
      {openDetailDialog && selectedInternship && (
        <div style={styles.dialogOverlay}>
          <div style={{ ...styles.dialog, maxWidth: '600px' }}>
            <div style={styles.dialogTitle}>{selectedInternship.title}</div>
            <div style={styles.dialogContent}>
              <p style={{ marginBottom: '12px' }}>
                <strong>Company:</strong> {selectedInternship.companyName || "N/A"}
              </p>

              {selectedInternship.locationCity && (
                <p style={{ marginBottom: '12px' }}>
                  📍 <strong>Location:</strong> {selectedInternship.locationCity}
                </p>
              )}

              {selectedInternship.duration && (
                <p style={{ marginBottom: '12px' }}>
                  ⏱️ <strong>Duration:</strong> {selectedInternship.duration} months
                </p>
              )}

              {selectedInternship.endDate && (
                <p style={{ marginBottom: '12px', color: '#1a73e8', fontWeight: '500' }}>
                  <strong>Ends On:</strong> {new Date(selectedInternship.endDate).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}

              <p style={{
                marginBottom: '12px',
                color: selectedInternship.stipend && Number(selectedInternship.stipend) > 0 ? 'green' : 'red',
                fontWeight: 'bold'
              }}>
                <strong>Stipend:</strong> {selectedInternship.stipend && Number(selectedInternship.stipend) > 0
                  ? `₹${selectedInternship.stipend}/month`
                  : "Unpaid"}
              </p>

              {selectedInternship.description && (
                <div style={{ marginTop: '16px', marginBottom: '12px' }}>
                  <strong>Description:</strong>
                  <p style={{ marginTop: '8px', color: '#4b5563', lineHeight: '1.6' }}>
                    {selectedInternship.description}
                  </p>
                </div>
              )}

              {selectedInternship.skills?.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <strong>Skills Required:</strong>
                  <div style={styles.skillsWrapper}>
                    {selectedInternship.skills.map((skill, idx) => (
                      <span key={idx} style={styles.skillChip}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div style={styles.dialogActions}>
              <button
                style={{ ...styles.dialogButton, ...styles.closeButton }}
                onClick={handleCloseDetailDialog}
              >
                Close
              </button>
              <button
                style={{ ...styles.dialogButton, backgroundColor: '#1a73e8', color: 'white' }}
                onClick={() => navigate("/apply")}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumePage;