import mongoose from 'mongoose';

const petReportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
  },
  petName: {
    type: String,
  },
  petType: {
    type: String,
    required: true,
  },
  petAge: {
    type: Number,
    
  },
  petImage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  },
  status: { // Added status field
    type: String,
    enum: ['Lost', 'Found'], // Limit values to 'Lost' or 'Found'
    required: true
  }
});

const PetReport = mongoose.model('PetReport', petReportSchema);

export default PetReport;

