import express from "express"
import { deleteBoard, getAllBoards, patchBoard, postBoard } from "../api/controllers/boardController.js";

const router = express.Router();

// get all boards
router.get("/", getAllBoards)

// get a singel board. I probably wount need this
router.get("/:id", (req, res) => {
    res.json({msg: "Get a singel board"})
})
//post a board

router.post("/", postBoard)

//delete a board
router.delete("/:boardId", deleteBoard)
//update a board
router.patch("/:boardId", patchBoard)




export default router;