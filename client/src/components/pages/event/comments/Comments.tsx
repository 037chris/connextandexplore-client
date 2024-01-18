import { useEffect, useState } from "react"
import { CommentsWithRatingsResource } from "../../../../Resources";
import { getCommentsOfEvent } from "../../../../backend/boardapi";

// export type CommentsProps = {
//     eventId: string
// }

interface CommentsProps {
    eventId: string | undefined
}


const Comments: React.FC<CommentsProps> = ({ eventId }) => {
    const [comments, setComments] = useState<CommentsWithRatingsResource | null>(null);

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

    return (
        <>
            {comments?.comments ? comments?.comments.map((comment) => (<div key={comment.id}>
                <h1>{comment.title}</h1>
                <p>{comment.content}</p>
                <p>{comment.stars}</p>
                <p>Date of creation: {comment.createdAt}</p>
                <p>{comment.edited ? "comment edited" : "comment not edited"}</p>

                <p>by: {comment.creatorName?.first}</p>

            </div>)) : <p>no comments found.</p>}
        </>
    )
}

export default Comments;