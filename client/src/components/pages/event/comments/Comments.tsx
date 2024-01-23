import { useContext, useEffect, useState } from "react";
import { DeleteComment } from "./DeleteComment";
import {
  CommentsWithRatingsResource,
  userResource,
} from "../../../../Resources";
import {
  getCommentsOfEvent,
  getUser,
  getUserIDFromJWT,
} from "../../../../backend/boardapi";
import { HiOutlineEmojiSad, HiOutlineStar } from "react-icons/hi";
import { HiStar } from "react-icons/hi2";
import { EditComment } from "./EditCommentModal";
import { CommentContext } from "../../../../actions/commentContext";

export type CommentsProps = {
  eventId: string;
};

const Comments: React.FC<CommentsProps> = ({ eventId }: CommentsProps) => {
  const { state: commentState, dispatch: commentDispatch } = useContext(
    CommentContext
  ) as any;

  const [comments, setComments] = useState<CommentsWithRatingsResource | null>(
    null
  );
  const [activeComment, setActiveComment] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const [authenticationModalIsOpen, setAuthenticationModalIsOpen] =
    useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState<userResource | null>(null);

  const load = async () => {
    try {
      const comments = await getCommentsOfEvent(eventId!);
      //console.log(comments);
      commentDispatch({ type: "SET_COMMENTS", payload: comments });
      //console.log("get comments", commentState);

      const id = await getUserIDFromJWT();
      if (!id) {
        return;
      }
      const u = await getUser(id);
      setUser(u);
    } catch (e) {
      setUser(null);
      setComments(null);
      commentDispatch({ type: "SET_COMMENTS", payload: null });
    }
  };

  useEffect(() => {
    load();
  }, [eventId, commentState.comments]);

  const openAuthenticationModal = () => {
    setAuthenticationModalIsOpen(true);
  };

  const openEditModal = () => {
    setModalIsOpen(true);
  };
  return (
    <>
      {commentState.comments.comments &&
      commentState.comments.comments.length > 0 ? (
        commentState.comments.comments.map((comment: any) => (
          <div className="col-span-1 flex" key={comment.id}>
            <div className="comment-box">
              <div>
                <p className="title">
                  {comment.creatorName?.first}: {comment.title}
                  <span className="stars">
                    {(() => {
                      switch (comment.stars) {
                        case 1:
                          return (
                            <>
                              <HiStar />
                              <HiOutlineStar />
                              <HiOutlineStar />
                              <HiOutlineStar />
                              <HiOutlineStar />
                            </>
                          );
                        case 2:
                          return (
                            <>
                              <HiStar />
                              <HiStar />
                              <HiOutlineStar />
                              <HiOutlineStar />
                              <HiOutlineStar />
                            </>
                          );
                        case 3:
                          return (
                            <>
                              <HiStar />
                              <HiStar />
                              <HiStar />
                              <HiOutlineStar />
                              <HiOutlineStar />
                            </>
                          );
                        case 4:
                          return (
                            <>
                              <HiStar />
                              <HiStar />
                              <HiStar />
                              <HiStar />
                              <HiOutlineStar />
                            </>
                          );
                        case 5:
                          return (
                            <>
                              <HiStar />
                              <HiStar />
                              <HiStar />
                              <HiStar />
                              <HiStar />
                            </>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </span>
                  <span className="sec-line">{comment.createdAt}</span>
                </p>
                <p className="comment-content">{comment.content}</p>

                {
                  <span className="edited">
                    {comment.edited && "(bearbeitet)"}
                  </span>
                }
                {user && comment.creator === user.id && (
                  <button className="delete" onClick={openAuthenticationModal}>
                    Löschen
                  </button>
                )}
                {user && comment.creator === user.id && (
                  <button className="edit" onClick={openEditModal}>
                    Bearbeiten
                  </button>
                )}
              </div>

              {user && comment.creator === user.id && (
                <DeleteComment
                  isOpen={authenticationModalIsOpen}
                  onClose={() => setAuthenticationModalIsOpen(false)}
                  commentId={comment.id!}
                />
              )}
              {user && comment.creator === user.id && (
                <EditComment
                  isOpen={modalIsOpen}
                  onClose={() => setModalIsOpen(false)}
                  commentId={comment.id!}
                  eventId={eventId}
                ></EditComment>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-1">
          {" "}
          <p className="no-comment">
            Noch kleine Kommentare vorhanden <HiOutlineEmojiSad />
          </p>
        </div>
      )}
    </>
  );
};

export default Comments;
