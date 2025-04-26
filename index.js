const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

const Ticket = require("./models/Ticket");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "bsbsfbrnsftentwnnwnwn";

app.use(express.json());
app.use(cookieParser());
app.use(
   cors({
      credentials: true,
      origin: "http://localhost:5173",
   })
);

mongoose.connect(process.env.MONGO_URL);

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "uploads/");
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname);
   },
});

const upload = multer({ storage });

app.get("/test", (req, res) => {
   res.json("test ok");
});

app.post("/register", async (req, res) => {
   const { name, email, password,userRole } = req.body;

   try {
      const userDoc = await UserModel.create({
         name,
         email,
         password: bcrypt.hashSync(password, bcryptSalt),
         userRole:userRole
      });
      res.json(userDoc);
   } catch (e) {
      res.status(422).json(e);
   }
});

app.post("/login", async (req, res) => {
   const { email, password } = req.body;

   const userDoc = await UserModel.findOne({ email });

   if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
   }

   const passOk = bcrypt.compareSync(password, userDoc.password);
   if (!passOk) {
      return res.status(401).json({ error: "Invalid password" });
   }

   jwt.sign(
      {
         email: userDoc.email,
         id: userDoc._id,
      },
      jwtSecret,
      {},
      (err, token) => {
         if (err) {
            return res.status(500).json({ error: "Failed to generate token" });
         }
         res.cookie("token", token).json(userDoc);
      }
   );
});

app.get("/profile", (req, res) => {
   const { token } = req.cookies;
   if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
         if (err) throw err;
         const { name, email, _id ,userRole} = await UserModel.findById(userData.id);
         res.json({ name, email, _id ,userRole});
      });
   } else {
      res.json(null);
   }
});

app.get("/userDet", async (req, res) => {
   try {
     const { idt } = req.query  // Now get the ID from query parameters
     console.log(idt)
     const user = await UserModel.findById(idt)
     if (!user) return res.status(404).json({ message: "User not found" })
     res.json(user)
   } catch (error) {
     res.status(500).json({ message: "Server error", error })
   }
 })
 






app.post("/logout", (req, res) => {
   res.cookie("token", "").json(true);
});

const eventSchema = new mongoose.Schema({
   owner: String,
   title: String,
   description: String,
   organizedBy: String,
   eventDate: Date,
   eventTime: String,
   location: String,
   Participants: Number,
   Count: Number,
   Income: Number,
   ticketPrice: Number,
   Quantity: Number,
   image: String,
   likes: Number,
    ApprovedBy:String,
    Status:String,
   Comment: [String],
   students: [
      {
         uid: String,
         uname: String
      }
   ]
});

const Event = mongoose.model("Event", eventSchema);

app.post("/createEvent", upload.single("image"), async (req, res) => {
   try {
      const eventData = req.body;
      eventData.image = req.file ? req.file.path : "";
      const newEvent = new Event(eventData);
      await newEvent.save();
      res.status(201).json(newEvent);
   } catch (error) {
      res.status(500).json({ error: "Failed to save the event to MongoDB" });
   }
});

app.get("/createEvent", async (req, res) => {
   try {
      const events = await Event.find();
      res.status(200).json(events);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch events from MongoDB" });
   }
});
app.get("/myEvent", async (req, res) => {
   const { email } = req.query;
 console.log('email')
   try {
     const events = await Event.find({ owner: email });; // filter by email field in MongoDB
     res.status(200).json(events);
   } catch (error) {
     res.status(500).json({ error: "Failed to fetch events from MongoDB" });
   }
 });
 

app.get("/event/:id", async (req, res) => {
   const { id } = req.params;
   try {
      const event = await Event.findById(id);
      res.json(event);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch event from MongoDB" });
   }
});

// approval
// Assuming you're using Express.js

app.post("/approveEvent", async (req, res) => {
   const { owner, ApprovedBy ,num} = req.body; // Getting owner (email) and the approver's email from the request body
 
   try {
      const stat=num?"Approved":"Rejected"
     const event = await Event.findOneAndUpdate(
       { owner: owner, Status: "Pending" }, // Find the event where owner matches and status is 'Pending'
       { 
         ApprovedBy: ApprovedBy,    // Set the ApprovedBy field to the approver's email
         Status: stat   // Change the Status to 'Approved'
       },
       { new: true }  // To return the updated document
     );
    
   
     if (!event) {
       return res.status(404).json({ error: "Event not found or already approved" });
     }
 
     res.status(200).json({ message: "Event approved", event });
   } catch (error) {
     res.status(500).json({ error: "Failed to update event" });
   }
 });
 


app.post("/event/:eventId", (req, res) => {
   const eventId = req.params.eventId;

   Event.findById(eventId)
      .then((event) => {
         if (!event) {
            return res.status(404).json({ message: "Event not found" });
         }

         event.likes += 1;
         return event.save();
      })
      .then((updatedEvent) => {
         res.json(updatedEvent);
      })
      .catch((error) => {
         console.error("Error liking the event:", error);
         res.status(500).json({ message: "Server error" });
      });
});

app.get("/events", (req, res) => {
   Event.find()
      .then((events) => {
         res.json(events);
      })
      .catch((error) => {
         console.error("Error fetching events:", error);
         res.status(500).json({ message: "Server error" });
      });
});

app.get("/event/:id/ordersummary", async (req, res) => {
   const { id } = req.params;
   try {
      const event = await Event.findById(id);
      res.json(event);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch event from MongoDB" });
   }
});

app.get("/event/:id/ordersummary/paymentsummary", async (req, res) => {
   const { id } = req.params;
   try {
      const event = await Event.findById(id);
      res.json(event);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch event from MongoDB" });
   }
});
app.post("/addUser", async (req, res) => {
   const { uid, uname, evid } = req.body;
 
   try {
     const event = await Event.findById(evid);
     if (!event) {
       return res.status(404).json({ error: "Event not found" });
     }
 
     const userExists = event.students.some(student => student.uid === uid);
 
     if (!userExists) {
       event.students.push({ uid, uname });
       await event.save();
       return res.status(200).json({ message: "User added to event", event });
     } else {
       return res.status(400).json({ error: "User already added" });
     }
 
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: "Internal server error" });
   }
 });
 
 
app.post("/tickets", async (req, res) => {
   try {
      const ticketDetails = req.body;
      const newTicket = new Ticket(ticketDetails);
      await newTicket.save();
      return res.status(201).json({ ticket: newTicket });
   } catch (error) {
      console.error("Error creating ticket:", error);
      return res.status(500).json({ error: "Failed to create ticket" });
   }
});

app.get("/tickets/:id", async (req, res) => {
   try {
      const tickets = await Ticket.find();
      res.json(tickets);
   } catch (error) {
      console.error("Error fetching tickets:", error);
      res.status(500).json({ error: "Failed to fetch tickets" });
   }
});

app.get("/tickets/user/:userId", (req, res) => {
   const userId = req.params.userId;

   Ticket.find({ userid: userId })
      .then((tickets) => {
         res.json(tickets);
      })
      .catch((error) => {
         console.error("Error fetching user tickets:", error);
         res.status(500).json({ error: "Failed to fetch user tickets" });
      });
});

app.delete("/tickets/:id", async (req, res) => {
   try {
      const ticketId = req.params.id;
      await Ticket.findByIdAndDelete(ticketId);
      res.status(204).send();
   } catch (error) {
      console.error("Error deleting ticket:", error);
      res.status(500).json({ error: "Failed to delete ticket" });
   }
});


//seminar schema
const s1Schema = new mongoose.Schema({
   uid: String,
   uname: String
 }); // Fixed at 24 documents

const s2Schema = new mongoose.Schema({
   uid: String,
   uname: String
 }); // Fixed at 30 documents
 
 // S3 Schema (Same structure, max 40 rows)
 const s3Schema = new mongoose.Schema({
   uid: String,
   uname: String
 }); // Fixed at 40 documents
 
 // S4 Schema (Same structure, max 50 rows)
 const s4Schema = new mongoose.Schema({
   uid: String,
   uname: String
 }); // Fixed at 50 documents
 
 // Create Models
 const S1 = mongoose.model('S1', s1Schema);
 const S2 = mongoose.model('S2', s2Schema);
 const S3 = mongoose.model('S3', s3Schema);
 const S4 = mongoose.model('S4', s4Schema);




 app.post("/s1", async (req, res) => {
   try {
     const { s1 } = req.body;
     console.log('Received /s1 request',s1);
 
     if (!Array.isArray(s1)) {
       return res.status(400).json({ error: "Expected an array of student data" });
     }
 
     // Get all existing UIDs in the received batch
     const receivedUids = s1.map(student => student.uid);
     const existingUids = await S1.find({ uid: { $in: receivedUids } }).distinct('uid');
     console.log('exist',existingUids);
     // Keep only students whose UID does not exist, preserving order
     const studentsToInsert = s1.filter(student => !existingUids.includes(student.uid));
 
     if (studentsToInsert.length === 0) {
       return res.status(200).json({
         message: "All students already exist in the database", 
         duplicates: s1.length,
         inserted: 0
       });
     }
 else{
     // Insert in order
     const result = await S1.insertMany(studentsToInsert, { ordered: true });
 
     res.status(201).json({
       message: `Inserted ${result.length} new students, skipped ${s1.length - result.length} duplicates`,
       inserted: result.length,
       duplicates: s1.length - result.length,
       data: result
     });
   }
   } catch (error) {
     console.error("Error processing /s1 request:", error);
     res.status(500).json({
       error: "Internal server error",
       details: error.message
     });
   }
 }); 
 
 
 
app.get("/s1", async (req, res) => {
   try {
     const hallins1 = await S1.find({});
  
     res.status(200).json({
       count: hallins1.length,
       data: hallins1
     });
     
   } catch (error) {
     console.error("Error fetching S1 data:", error);
     res.status(500).json({ 
       error: "Internal server error",
       details: error.message 
     });
   }
 });




app.post("/s2", async (req, res) => {
   try {
      
   } catch (error) {
      console.error("Error :", error);
      
   }
});
app.post("/s3", async (req, res) => {
   try {
      
   } catch (error) {
      console.error("Error :", error);
      
   }
});
app.post("/s4", async (req, res) => {
   try {
      
   } catch (error) {
      console.error("Error :", error);
      
   }
});

app.get('/tickitUser', async (req, res) => {
   const { userid,eventid } = req.query;
 
   try {
     const ticket = await Ticket.findOne({ userid, eventid });
     if (!ticket) return res.status(404).json({ message: "Ticket not found" });
 
     res.json(ticket);
   } catch (err) {
     console.error(err);
     res.status(500).json({ message: "Server error" });
   }
 });





const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
