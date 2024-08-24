// import mongoose, { Schema } from "mongoose";

// const passwordResetSchema = Schema({
//   userId: { type: String, unique: true },
//   email: { type: String, unique: true },
//   token: String,
//   createdAt: Date,
//   expiresAt: Date,
// });

// const PasswordReset = mongoose.model("PasswordReset", passwordResetSchema);

// export default PasswordReset;
import mongoose from 'mongoose';

const passwordResetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Ngo' },
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
});

const PasswordReset = mongoose.models.PasswordReset || mongoose.model('PasswordReset', passwordResetSchema);

export default PasswordReset;
