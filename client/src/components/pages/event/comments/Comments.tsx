import { useEffect, useState } from "react"
import { EditComment } from "./EditComment";
import { DeleteComment } from "./DeleteComment";
import { CommentsWithRatingsResource, userResource } from "../../../../Resources";
import { getCommentsOfEvent, getUser, getUserIDFromJWT } from "../../../../backend/boardapi";
import { HiOutlineEmojiSad, HiOutlineStar } from "react-icons/hi";
import { HiStar } from "react-icons/hi2";

export type CommentsProps = {
    eventId:string
}

const Comments:React.FC<CommentsProps> = ({eventId}:CommentsProps) => {
    const [comments, setComments] = useState<CommentsWithRatingsResource | null>(null);
    const [activeComment, setActiveComment] = useState<string>("");

    const [user, setUser] = useState<userResource | null>(null);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const load = async() => {
        try {
            const comments = await getCommentsOfEvent(eventId!);
            console.log(comments);
            setComments(comments);

            const id = await getUserIDFromJWT();
            if (!id) {
                return;
            }
            const u = await getUser(id);
            setUser(u);
        } catch (e) {
            setUser(null);
            setComments(null)
        }
    }

    useEffect(() => {load();}, [])

    return (
        <>
            <div className="col-span-1">
                {(comments?.comments && comments.comments.length > 0) ? (
                    comments.comments.map((comment) => (
                        <div className="comment-box">
                            <div key={comment.id}>
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
                                {/* <p>{comment.edited ? "comment edited" : "comment not edited"}</p> */}
                                {/* <button className="delete">löschen</button> */}
                                {/* {user && (user.isAdministrator || user.id === comment.creator) && (
                                    <>
                                        {activeComment === comment.id ? (
                                            <EditComment
                                                commentId={comment.id}
                                                eventId={comment.event}
                                                onCancel={() => setActiveComment("")}
                                            />
                                        ) : (
                                            <button onClick={() => setActiveComment(comment.id!)}>Edit this comment</button>
                                        )}
                                        <button onClick={() => openModal()}>Delete?</button>
                                        {modalIsOpen && activeComment === comment.id && (
                                            <DeleteComment
                                                isOpen={modalIsOpen}
                                                onClose={closeModal}
                                                commentId={comment.id!}
                                                key={comment.id}
                                            />
                                        )}
                                    </>
                                )} */}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-comment">Noch kleine Kommentare vorhanden <HiOutlineEmojiSad /></p>
                )}

            </div>
        </>
    );
}

export default Comments;