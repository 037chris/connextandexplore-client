import { useEffect, useState } from "react";
import { CommentResource, eventResource, userResource } from "../../../../Resources";
import Input from "../../../html/inputs/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { getUserIDFromJWT, getUser, getEvent, updateComment, getComment } from "../../../../backend/boardapi";

type EditCommentProps = {
    commentId:string;
    eventId:string;
    onCancel: () => void;
}

export const EditComment = ({commentId, eventId, onCancel}:EditCommentProps) => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<userResource | null>(null);
    const [comment, setComment] = useState<CommentResource | null>(null);
    const [event, setEvent] = useState<eventResource | null>(null);

    const load = async () => {
        try {
            const id = await getUserIDFromJWT();
            const u:userResource = await getUser(id);
            console.log(u);
            setUser(u);
            
            const ev = await getEvent(eventId);
            setEvent(ev);
            const c = await getComment(commentId, eventId);
            const co:CommentResource = {
                id:c.id,
                title: c.title,
                stars: c.stars,
                content: c.content,
                edited: c.edited,
                creator: c.creator,
                creatorName: c.creatorName,
                createdAt: c.createdAt,
                event: c.event,
                eventName: event?.name,
            }
            setComment(co);
            console.log(u,c,ev)
        } catch (err) {
            console.log(err);
            setUser(null);
            setComment(null);
            setEvent(null);
        }
    }

    useEffect(() => { load(); }, []);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({})

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);
        try {
            const c:CommentResource= {
                ...comment,
                title: data.title,
                stars: data.stars,
                content: data.content,
                edited: true,
                creator: user?.id!,
                creatorName:user?.name,
                event: event?.id!,
                eventName: event?.name
            }
            console.log(c);
            const res = await updateComment(c);
            console.log(res);
            setComment(res);
            reset();
        } catch (error) {
            console.error(error);
            //todo: map backend validation error to inputfield
            //toast.error('Something went wrong...');
        } finally {
            setLoading(false);
        }
    }

    return <>
    <h1>edit comment!</h1>
    {comment && event && user &&
    (<form onSubmit={handleSubmit(onSubmit)}>
        <Input
            id="title"
            label='Title *'
            disabled={loading}
            register={register}
            errors={errors}
            required
            defaultValue={comment.title}
        />
        <Input
            id="content"
            label='Content *'
            disabled={loading}
            register={register}
            errors={errors}
            required
            defaultValue={comment.content}
        />
        <Input
            id="stars"
            label='Stars *'
            disabled={loading}
            register={register}
            errors={errors}
            required
            //pattern={/0-9/}
            //defaultValue={comment.stars}
        />
        <button type="submit" disabled={loading}>Submit</button>
        <button type="button" onClick={onCancel} disabled={loading}>Cancel</button>
    </form>)}
    </>
}