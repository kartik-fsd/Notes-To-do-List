const express = require("express");
const router = express.Router();
const Notes = require("../models/NotesSchema");
var fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// ROUTE 1:Get all the user notes using Get:api/notes/fetchAllNotes - LOGIN required
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});
//Route2:Add new notes using Using Post:api/notes/AddNote - Login required
router.post(
  "/AddNote",
  fetchUser,
  [
    //title must be minimum of 1 chars
    body("title", "Enter a valid title").isLength({ min: 1 }),
    // description must be minimum of 5 chars
    body("description", "Enter a minimum 5 characater").isLength({ min: 5 }),],
  async (req, res) => {
    try {
      const { title,  description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: Update an existing note using  Put:api/notes/updateNote - Login required
router.put('/updateNotes/:id',fetchUser,async(req,res)=>{
  const {title,description,tag} = req.body;
  try{
  // craete a new note object
  const newNote = {};
  if(title){
    newNote.title = title;
  }
  if(description){
    newNote.description = description;
  }
  if(tag){
    newNote.tag = tag;
  }
  //find the note to be update and update
  let note =  await Notes.findById(req.params.id);
  if(!note){
    return res.status(404).send("Not found")
  }
  if(note.user.toString()!== req.user.id){
    return res.status(401).send("Not allowed")
  }

  note =await Notes.findByIdAndUpdate( req.params.id ,{$set:newNote} ,{new:true});
  res.json({note});
  }
  catch (error) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }

})


// Route 4: Delete an existing note using  Delete:api/notes/DeleteNote - Login required
router.delete('/DeleteNote/:id',fetchUser,async(req,res)=>{

try{
  //find the note to be delete and Delete
  let note =  await Notes.findById(req.params.id);
  if(!note){
    return res.status(404).send("Not found")
  }
  if(note.user.toString()!== req.user.id){
    return res.status(401).send("Not allowed")
  }

  note =await Notes.findByIdAndDelete( req.params.id);
  res.json({"Success": "Note has been deleted"});
}
catch (error) {
  console.error(err.message);
  res.status(500).send("Internal Server Error");
}
})
module.exports = router;
