import mongoose from 'mongoose';


const { Schema } = mongoose;

const OwnerSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
});

const Owner = mongoose.model('Owner', OwnerSchema);

export default Owner;

