import Internship from '../models/internshipModel.js';

// Get all internships
export const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find({});
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get internship by ID
export const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (internship) {
      res.json(internship);
    } else {
      res.status(404).json({ message: 'Internship not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new internship (protected/admin only)
export const createInternship = async (req, res) => {
  try {
    const newInternship = new Internship({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      description: req.body.description,
      applyLink: req.body.applyLink,
    });

    const createdInternship = await newInternship.save();
    res.status(201).json(createdInternship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
