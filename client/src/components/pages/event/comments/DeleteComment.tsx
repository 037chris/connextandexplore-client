import { MouseEvent, useState } from "react";
import Button from "../html/Button";
import Modal from "../modals/Modal";
import Heading from "../Heading";
import { deleteComment } from "../../../../backend/boardapi";

 type DeleteCommentProps = {
    isOpen: boolean;
    onClose: () => void;
    commentId: string;
}

export const DeleteComment = ({ isOpen, onClose }: DeleteCommentProps) => {
   
    const [loading, setLoading] = useState(false);


    const handleDelete = async () => {
        try {
          setLoading(true);
          // Uncomment the line below when you have the actual deleteComment implementation
          // const deleteComment = await deleteComment(commentId);
          console.log("Comment deleted successfully");
            const response = await deleteComment(commentId);
        } catch (err) {
          console.error("Error deleting comment", err);
        } finally {
          setLoading(false);
          onClose();
        }
      };




    const footerContent = (
       <></>
    );

    return (
        <Modal
      isOpen={isOpen}
      onClose={onClose}
      body={
   
        <div className="flex flex-col gap-2">
            <Heading title="Sind Sie sicher, dass Sie das tun möchten?" subtitle="Die Bewertung wird dauerhaft gelöscht." />
          {/* <h2>Sind Sie sicher, dass Sie das tun möchten?</h2> */}
        </div>
      }
      onSubmit={handleDelete}
      footer={footerContent}
      actionLabel="Delete"
      disabled={loading}
      seconaryAction={onClose}
      secondaryActionLabel="Cancel"
      
    />
      );
    };