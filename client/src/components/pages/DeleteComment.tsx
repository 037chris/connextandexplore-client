import { deleteComment } from "../../backend/boardapi";

export type DeleteCommentProps = {
    isOpen:boolean;
    onClose:()=>void;
    commentId:string;
}

export const DeleteComment = ({ isOpen, onClose, commentId }:DeleteCommentProps) => {
    if (!isOpen) return null;

    async function handleDelete(e: React.FormEvent) {
        e.preventDefault();
        try {
        const response = await deleteComment(commentId);
        } catch (err) {
            throw err;
        }
        console.log("deleted comment");
        onClose();
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Are you sure you want to delete this comment?</h2>
                <button onClick={(e)=>{handleDelete(e)}}>Yes, delete it</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};
