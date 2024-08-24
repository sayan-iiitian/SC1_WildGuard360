import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const videoSchema = new mongoose.Schema(
{
    videoFile:{
        type: String,//cloudinary link
        required: [true, 'Please provide a video file']
    },
    thumbnail:{
        type: String,//cloudinary link
        required: [true, 'Please provide a thumbnail']
    },
    title:{
        type: String,
        required: [true, 'Please provide a title']
    },
    description:{
        type: String,
        required: [true, 'Please provide a description']
    },
    duration:{
        type: Number,//cloudinary link
        required: [true, 'Please provide a duration']
    },
    views:{
        type: Number,
        default: 0
    },
    isPublished:{
        type: Boolean,
        default: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

},
    {
    timestamps: true
    }
);
    videoSchema.plugin(mongooseAggregatePaginate);

    export const Video = mongoose.model('Video', videoSchema);
