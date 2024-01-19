import { useEffect, useState } from "react"
import { CommentsWithRatingsResource } from "../../../../Resources";
import { getCommentsOfEvent } from "../../../../backend/boardapi";
import { HiStar } from "react-icons/hi2";
import { HiOutlineEmojiSad, HiOutlineStar } from "react-icons/hi";
import { DeleteComment } from "../../DeleteComment";

// export type CommentsProps = {
//     eventId: string
// }

interface CommentsProps {
    eventId: string | undefined
}


const Comments: React.FC<CommentsProps> = ({ eventId }) => {
    const [comments, setComments] = useState<CommentsWithRatingsResource | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const [authenticationModalIsOpen, setAuthenticationModalIsOpen] = useState(false);
    const load = async () => {
        try {
            const comments = await getCommentsOfEvent(eventId!);
            //console.log(comments);
            setComments(comments);
        } catch (e) {
            setComments(null)
        }
    }

    useEffect(() => { load(); }, [eventId])

    const openAuthenticationModal = () => {
        setIsOpen(false);
        setAuthenticationModalIsOpen(true);
      };
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
                                                            <HiOutlineStar />
                                                            <HiOutlineStar />
                                                            <HiOutlineStar />
                                                            <HiOutlineStar />
                                                            <HiStar />
                                                        </>
                                                    );
                                                case 2:
                                                    return (
                                                        <>
                                                            <HiOutlineStar />
                                                            <HiOutlineStar />
                                                            <HiOutlineStar />
                                                            <HiStar />
                                                            <HiStar />
                                                        </>
                                                    );
                                                case 3:
                                                    return (
                                                        <>
                                                            <HiOutlineStar />
                                                            <HiOutlineStar />
                                                            <HiStar />
                                                            <HiStar />
                                                            <HiStar />
                                                        </>
                                                    );
                                                case 4:
                                                    return (
                                                        <>
                                                            <HiOutlineStar />
                                                            <HiStar />
                                                            <HiStar />
                                                            <HiStar />
                                                            <HiStar />
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
                                <button className="delete" onClick={openAuthenticationModal}>löschen</button>
                            </div>

                        </div>
                        
                    ))
                    
                ) : (
                    <p className="no-comment">Noch kleine Kommentare vorhanden <HiOutlineEmojiSad /></p>
                )}

            </div>
            <DeleteComment isOpen={authenticationModalIsOpen} onClose={() => setAuthenticationModalIsOpen(false)} commentId={""}  />

        </>
    );
}

export default Comments;