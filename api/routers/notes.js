const { Router } = require("express");
const Note = require("../models/note");

const router = Router();

router.post("/", async (req, res) => {
  const note = new Note({
    question: req.body.question,
    answer: req.body.answer
  });

  try {
    await note.save();

    res.status(201).json(note);
  } catch (e) {
    console.log(e);
  }
});

router.get("/all", async (req, res) => {
  const notes = await Note.find();

  res.status(200).json(notes);
});

router.get("/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);

  res.json(note);
});

router.put("/:id", async (req, res) => {
  const {id} = req.params;
  await Note.findByIdAndUpdate(id, req.body);

  res.status(202).json({id, message: 'updated'})
})


router.delete("/:id", async (req, res) => {
  const {id} = req.params;
  await Note.findByIdAndDelete(id);
  
  res.status(202).json({id, message: 'deleted'})

})

module.exports = router;