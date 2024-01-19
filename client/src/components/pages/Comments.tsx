import { useEffect, useState } from "react"
import { CommentsWithRatingsResource, userResource } from "../../Resources";
import { getCommentsOfEvent, getUser, getUserIDFromJWT } from "../../backend/boardapi";
import { EditComment } from "./EditComment";
import { DeleteComment } from "./DeleteComment";

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

    return <>
        {comments?.comments?comments?.comments.map((comment)=>(<div key={comment.id}>
            <h1>{comment.title}</h1>
            <p>{comment.content}</p>
            <p>{comment.stars}</p>
            <p>Date of creation: {comment.createdAt}</p>
            <p>{comment.edited?"comment edited":"comment not edited"}</p>

            <p>Comment for event: {comment.event}, by: {comment.creatorName?.first}</p>
                 {user && (user.isAdministrator || user.id === comment.creator) && (
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
                    )}
        </div>)):<p>no comments found.</p>}
    </>
}

export default Comments;