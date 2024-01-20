import { useEffect, useState } from "react";
import { CommentResource, eventResource, userResource } from "../../../../Resources";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { getUserIDFromJWT, getUser, updateUser, createComment, getEvent } from "../../../../backend/boardapi";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../html/inputs/Input";
import toast from "react-hot-toast";
import Modal from "../../../modals/Modal";
import Heading from "../../../Heading";


interface CreateCommentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateComment = ({
    isOpen,
    onClose
}: CreateCommentModalProps) => {

    const params = useParams();
    const eventId = params.eventId
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<userResource | null>(null);
    const [event, setEvent] = useState<eventResource | null>(null);
    const [selectedStars, setSelectedStars] = useState<number>(5);

    const handleStarClick = (star: number) => {
        setSelectedStars(star);
    };

    const navigate = useNavigate();

    const load = async () => {
        try {
            const id = await getUserIDFromJWT();
            const u: userResource = await getUser(id);
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
            const comment: CommentResource = {
                title: data.title,
                stars: selectedStars, 
                content: data.content,
                edited: false,
                creator: user?.id!,
                creatorName: user?.name,
                event: event?.id!,
                eventName: event?.name
            }
            console.log("comment", comment);
            const res = await createComment(comment);
            console.log(res);


            toast.success('Erfolgreich abgegeben!');
            onClose();

            navigate(0)

            reset();
        } catch (error) {
            console.error(error);
            //todo: map backend validation error to inputfield
            //toast.error('Something went wrong...');
        } finally {
            setLoading(false);
        }
    }


    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <div
                className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Placeholder
                    </div>

                </div>
            </div>
        </div>

    );


    return <>
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={
                <div className="flex flex-col gap-2">
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                        <Heading
                            title='Bewertung und Rezension'
                            subtitle='Teile deine Gedanken mit!'
                        />
                        <Input
                            id="title"
                            label='Titel *'
                            disabled={loading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            id="content"
                            label='Inhalt *'
                            disabled={loading}
                            register={register}
                            errors={errors}
                            required
                        />
                        {/* <Input
                            id="stars"
                            label='Sterne *'
                            disabled={loading}
                            register={register}
                            errors={errors}
                            required
                        //pattern={/0-9/}
                        /> */}

                        <div className="flex items-center gap-2 text-">
                            <span className="font-thin text-gray-500">Sterne *: </span>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`cursor-pointer text-3xl ${selectedStars >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                    onClick={() => handleStarClick(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>


                    </form>
                </div>
            }
            footer={footerContent}
            actionLabel='Abgeben'
            disabled={loading}


        />




    </>
}