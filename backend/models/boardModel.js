import mongoose from "mongoose";

const Schema = mongoose.Schema

const subTaskSchema = new Schema({
    title: { type: String, required: false },
    isCompleted: { type: Boolean, required: false },
    // _id is auto-generated
}, { timestamps: true });

const taskSchema = new Schema({
    title: { type: String, required: false },
    description: { type: String },
    status: { type: String, required: false },
    subTasks: [subTaskSchema],  // _id will be generated for each subTask
}, { timestamps: true });

const columnSchema = new Schema({
    name: { type: String, required: false },
    tasks: [taskSchema],  // _id will be generated for each task
}, { timestamps: true });

const boardSchema = new Schema({
    name: { type: String, required: false },
    columns: [columnSchema],  // _id will be generated for each column
}, { timestamps: true });

const Board = mongoose.model('Board', boardSchema);

export default Board;