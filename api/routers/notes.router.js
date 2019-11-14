const { Router } = require("express");
const controllers = require('../controllers/notes.controller');

const router = Router();

router.post("/", controllers.createNote);

router.get("/all", controllers.getAllNotes);

router.get("/:id", controllers.getNoteById);

router.get("/category/:id", controllers.getAllNotesByCategoryId)

router.put("/:id", controllers.editNote)

router.delete("/:id", controllers.deleteNoteById)

module.exports = router;