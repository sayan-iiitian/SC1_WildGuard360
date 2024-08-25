import mongoose from 'mongoose';
const { Schema } = mongoose;

const donationSchema = new mongoose.Schema({
    name: String,
    address: String,
    donationType: String,
    amount: Number
});

const Donation = mongoose.model('Donation', donationSchema);


export default Donation;


