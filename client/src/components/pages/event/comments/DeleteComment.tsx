
import { MouseEvent, useState } from "react";
import Heading from "../../../Heading";
import Modal from "../../../modals/Modal";
import { deleteComment } from "../../../../backend/boardapi";
import { useNavigate } from "react-router-dom";


type DeleteCommentProps = {
  isOpen: boolean;
  onClose: () => void;
  commentId: string;
}

export const DeleteComment = ({ isOpen, onClose, commentId }: DeleteCommentProps) => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setLoading(true);
      // Uncomment the line below when you have the actual deleteComment implementation
      const deletedComment = await deleteComment(commentId);
      navigate(0);
      console.log("Comment deleted successfully");
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