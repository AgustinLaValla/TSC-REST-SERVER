import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: { type:String, required:true },
    url: { type:String, required:true , unique:true, lowercase:true},
    content: { type:String, required:true },
    image: String,
    createdAt: { type:Date, default: Date.now },
    UpdatedAt: Date
});

export default model('Post', postSchema);