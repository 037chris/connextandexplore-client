import { useEffect, useState } from "react";
import { CommentResource, eventResource, userResource } from "../../../../Resources";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { getUserIDFromJWT, getUser, updateUser, createComment, getEvent } from "../../../../backend/boardapi";
import { useParams } from "react-router-dom";
import Input from "../../../html/inputs/Input";

export const CreateComment = () => {

    const params = useParams();
    const eventId = params.eventId
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<userResource | null>(null);
    const [event, setEvent] = useState<eventResource | null>(null);
    const load = async () => {
        try {
            const id = await getUserIDFromJWT();
            const u:userResource = await getUser(id);
            console.log(u);
            setUser(u);
            const ev = await getEvent(eventId!);
            setEvent(ev)
        } catch (err) {
            setUser(null);
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
            const comment:CommentResource= {
                title: data.title,
                stars: data.stars,
                content: data.content,
                edited: false,
                creator: user?.id!,
                creatorName:user?.name,
                event: event?.id!,
                eventName: event?.name
            }
            console.log(comment);
            const res = await createComment(comment);
            console.log(res);
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
    <h1>create a comment!</h1>

    <form onSubmit={handleSubmit(onSubmit)}>
        <Input
            id="title"
            label='Title *'
            disabled={loading}
            register={register}
            errors={errors}
            required
        />
        <Input
            id="content"
            label='Content *'
            disabled={loading}
            register={register}
            errors={errors}
            required
        />
        <Input
            id="stars"
            label='Stars *'
            disabled={loading}
            register={register}
            errors={errors}
            required
            //pattern={/0-9/}
        />
        <button onSubmit={handleSubmit(onSubmit)}> submit </button>
    </form>
    </>
}