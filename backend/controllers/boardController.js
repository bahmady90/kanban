import Board from "../models/boardModel.js"

// get all boards

export async function getAllBoards(req, res){
    try{
        const allBoards = await Board.find({})
        res.status(200).json(allBoards)
    } catch(error){
        res.status(400).json({error: error.message})
        
    }
}

//post a board
export async function postBoard(req, res) {
    try{
        const {newBoard} = req.body
        const postedBoard = await Board.create({...newBoard})
        res.status(200).json(postedBoard)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a board
export async function deleteBoard(req, res) {
    try{
        const {boardId} = req.params;
        const deletedBoard = await Board.findByIdAndDelete(boardId);
        res.status(200).json(deleteBoard)

        if (!deletedBoard) {
            return res.status(404).json({ message: "Board not found" });
        }

    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//patch a board
export async function patchBoard(req, res) {
    try{
        const {boardId} = req.params;
        const {newBoard} = req.body;
        const updatedBoard = await Board.findOneAndUpdate(
            { _id: boardId }, // Find board by its correct ID (from params)
            { ...newBoard }, // Update it with the newBoard data
            { new: true } // Return the updated document
          );
        if(!updatedBoard){
            return res.status(404).json({message: "board not found"})
        }
        res.status(200).json(updatedBoard)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}




