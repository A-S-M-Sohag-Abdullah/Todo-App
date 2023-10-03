/**********************
 * Title: Todo App
 * Description: Todo Application server
 * Author: A. S. M. Sohag Abdullah
 * Date: 7th Sep, 2023
 **********************/

//dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { signupCollection, todoCollection } = require("./db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const auth = require("./custom middlewares/auth");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

//middlewares
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

async function updateExpiredTasks() {
  //console.log('expiring')
  /* try {
    const currentDate = new Date().getTime();
    console.log(currentDate);
    await todoCollection.updateMany(
      { dueDate: { $lt: currentDate }, expired: false },
      { $set: { expired: true } }
    );
    console.log("Expired tasks updated successfully.");
  } catch (error) {
    console.error("Error updating expired tasks:", error);
  } */

  try {
    const currentDate = new Date().getTime();
    console.log("Current Date:", currentDate);

    const result = await todoCollection.updateMany(
      {
        $or: [
          { dueDate: { $lt: currentDate }, done:false, expired: false },
          { dueDate: { $lt: currentDate }, done:false , expired: { $exists: false } },
        ],
      },
      { $set: { expired: true } }
    );

    console.log("Result:", result);

    if (result.modifiedCount > 0) {
      console.log("Expired tasks updated successfully.");
    } else {
      console.log("No tasks were updated.");
    }
  } catch (error) {
    console.error("Error updating expired tasks:", error);
  }
}

// Schedule the function to run once per day, for example
updateExpiredTasks();
setInterval(updateExpiredTasks, 24 * 60 * 60 * 1000);

//get requests
app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/todos", async (req, res) => {
  const token = req.cookies.token;
  try {
    // Verify and decode the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.error("JWT verification failed:");
      } else {
        // `decoded` contains the payload data
        console.log("Decoded payload:", decoded);
        const todos = await todoCollection.find({ email: decoded.email });
        //res.send("todos", { items: todos });
        res.status(200).send(todos);
      }
    });
  } catch (err) {
    console.log("sdasdas");
  }
});

app.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send(true);
});

app.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) res.send(false);

    jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    res.send(true);
  } catch (err) {
   /*  res.send(false); */
  }
});

//post requests
app.post("/signup", async (req, res) => {
  //console.log(req.body);
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  console.log("signup req rec");
  const check = await signupCollection.findOne({ email: req.body.email });

  if (!check) {
    console.log("no similar user");
    try {
      const data = new signupCollection({
        username,
        email,
        password,
      });

      await data.save();
      console.log("data saved");
      const token = jwt.sign(
        {
          email: req.body.email,
        },
        process.env.JWT_SECRET_KEY
      );

      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .send(true);
      console.log("cookie and response send");

      console.log(token);
      //res.redirect("/");
    } catch (err) {
      console.log(err);
      res.send(false);
    }
  } else {
    res.send(false);
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await signupCollection.findOne({ email: req.body.email });

    if (check.password === req.body.password) {
      const token = jwt.sign(
        {
          email: req.body.email,
        },
        process.env.JWT_SECRET_KEY
      );

      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .send(true);

      console.log(token);
    } else {
      console.log("false hit 1");
      res.status(401).send(false);
    }
  } catch (e) {
    console.log("false hit 2");
    res.status(401).send(false);
  }
});

app.post("/savetodo", auth, async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      console.error("JWT verification failed:", err);
    } else {
      console.log("Decoded payload:", decoded);
      const email = decoded.email;
      const task = req.body.task;
      const dueDate = req.body.dueDate;

      try {
        const data = new todoCollection({
          task,
          email,
          dueDate,
        });

        const todo = await data.save();
        res.send(todo._id);
      } catch (err) {
        console.log(err);
        res.send("error saving todo");
      }
    }
  });
});

//put methods
app.put("/savetodo/:id", async (req, res) => {
  const id = req.params.id;
  const token = req.cookies.token;
  const updatedData = req.body;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("JWT verification failed:", err);
    } else {
      updatedData.email = decoded.email;
    }
  });

  try {
    const updatedDocument = await todoCollection.findOneAndUpdate(
      { _id: id },
      updatedData,
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).send("Document not found");
    }
    return res.json(updatedDocument);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
});

//delete methods
app.delete("/deletetodo/:id", async (req, res) => {
  try {
    const result = await todoCollection.deleteOne({ _id: req.params.id });
    console.log("Document deleted successfully");
    console.log(result);
    res.send(result); // The result object contains information about the deletion
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
