const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  contact: {
    type: String,
    required: [true, 'Please provide your contact number'],
    trim: true,
  },
  organisation: {
    type: String,
    required: [true, 'Please provide your organisation name'],
    trim: true,
  },
  delegates: {
    type: Number,
    required: [true, 'Please provide number of delegates'],
    min: [1, 'Number of delegates must be at least 1']
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;