import { useEffect, useState } from "react"
import { DeleteComment } from "./DeleteComment";
import { CommentsWithRatingsResource, userResource } from "../../../../Resources";
import { getCommentsOfEvent, getUser, getUserIDFromJWT } from "../../../../backend/boardapi";
import { HiOutlineEmojiSad, HiOutlineStar } from "react-icons/hi";
import { HiStar } from "react-icons/hi2";
import { EditComment } from "./EditCommentModal";

export type CommentsProps = {
    eventId: string
}

const Comments: React.FC<CommentsProps> = ({ eventId }: CommentsProps) => {
    const [comments, setComments] = useState<CommentsWithRatingsResource | null>(null);
    const [activeComment, setActiveComment] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);

    const [authenticationModalIsOpen, setAuthenticationModalIsOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [user, setUser] = useState<userResource | null>(null);

    const load = async () => {
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

    useEffect(() => { load(); }, [eventId])

    const openAuthenticationModal = () => {
        setAuthenticationModalIsOpen(true);
    };

    const openEditModal = () => {
        setModalIsOpen(true);
    }
    return (
        <>
            <div className="col-span-1">
                {(comments?.comments && comments.comments.length > 0) ? (
                    comments.comments.map((comment) => (
                        <div className="comment-box" key={comment.id}>
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
                                { <p>{comment.edited ? "comment edited" : "comment not edited"}</p> }
                                
                                {user && comment.creator === user.id && <button className="delete" onClick={openAuthenticationModal}>löschen</button>}
                                {user && comment.creator === user.id && <button className="edit" onClick={openEditModal}>edit</button>}
                                
                            </div>
                            
                                {user && comment.creator === user.id && <DeleteComment isOpen={authenticationModalIsOpen} onClose={() => setAuthenticationModalIsOpen(false)} commentId={comment.id!} />}
                                {user && comment.creator === user.id && <EditComment isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} commentId={comment.id!} eventId={eventId}></EditComment>}
                            
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