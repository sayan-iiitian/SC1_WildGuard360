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
  petName: {
    type: String,
    required: true
  },
  petType: {
    type: String,
    required: true
  },
  petAge: {
    type: Number,
    required: true
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
  }
});

const PetReport = mongoose.model('PetReport', petReportSchema);

export default PetReport;
