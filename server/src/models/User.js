import mongoose from 'mongoose';

const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: false
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

export default User;

