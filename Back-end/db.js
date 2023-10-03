/**********************
 * Title: Todo App
 * Description: Todo Application database functionality
 * Author: A. S. M. Sohag Abdullah
 * Date: 7th Sep, 2023
 **********************/

//dependencies
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/todoapp")
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.log("failed");
  });

const signupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const dueDate = ()=>{
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const day = String(currentDate.getDate()).padStart(2, '0');

  const nextDate = `${year}-${month}-${day}`;

  return nextDate;
}

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    default: dueDate(),
  },
  expired: {
    type: Boolean,
    default:false
  },
  done: {
    type: Boolean,
    default:false
  }
});

const signupCollection = new mongoose.model("user", signupSchema);
const todoCollection = new mongoose.model("todo", todoSchema);

module.exports = { signupCollection, todoCollection};
