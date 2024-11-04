const express = require('express');
const router = express.Router();
const Registration = require('../model/dbSchema.js');

router.post('/register', async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, contact, organisation, delegates } = req.body;

    // Basic validation
    if (!name || !email || !contact || !organisation || !delegates) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if email already exists
    const existingRegistration = await Registration.findOne({ email });
    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create new registration
    const registration = new Registration({
      name,
      email,
      contact,
      organisation,
      delegates
    });

    // Save to database
    await registration.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: registration
    });

  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    // Handle other errors
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;