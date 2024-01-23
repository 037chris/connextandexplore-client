import { useEffect, useState } from "react";
import {
  CommentResource,
  eventResource,
  userResource,
} from "../../../../Resources";
import Input from "../../../html/inputs/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import {
  getUserIDFromJWT,
  getUser,
  getEvent,
  updateComment,
  getComment,
} from "../../../../backend/boardapi";
import Modal from "../../../modals/Modal";
import Heading from "../../../html/Heading";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type EditCommentProps = {
  isOpen: boolean;
  onClose: () => void;
  commentId: string;
  eventId: string;
};

export const EditComment = ({
  isOpen,
  onClose,
  commentId,
  eventId,
}: EditCommentProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<userResource | null>(null);
  const [comment, setComment] = useState<CommentResource | null>(null);
  const [event, setEvent] = useState<eventResource | null>(null);
  const [selectedStars, setSelectedStars] = useState<number>(5);
  const navigate = useNavigate();

  const handleStarClick = (star: number) => {
    setSelectedStars(star);
  };

  const load = async () => {
    try {
      const id = await getUserIDFromJWT();
      const u: userResource = await getUser(id);
      console.log(u);
      setUser(u);

      const ev = await getEvent(eventId);
      setEvent(ev);
      const c = await getComment(commentId, eventId);
      const co: CommentResource = {
        id: c.id,
        title: c.title,
        stars: c.stars,
        content: c.content,
        edited: c.edited,
        creator: c.creator,
        creatorName: c.creatorName,
        createdAt: c.createdAt,
        event: c.event,
        eventName: event?.name,
      };
      setComment(co);
      console.log(u, c, ev);
    } catch (err) {
      console.log(err);
      setUser(null);
      setComment(null);
      setEvent(null);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FieldValues>({});

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const c: CommentResource = {
        ...comment,
        title: data.title,
        stars: selectedStars,
        content: data.content,
        edited: true,
        creator: user?.id!,
        creatorName: user?.name,
        event: event?.id!,
        eventName: event?.name,
      };
      console.log(c);
      const res = await updateComment(c);
      console.log(res);
      setComment(res);
      reset();
      onClose();
      //navigate(0);
    } catch (error) {
      console.error(error);
      toast.error("Etwas ist fehlgeschlagen...");
      //todo: map backend validation error to inputfield
      //toast.error('Something went wrong...');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (comment) {
      setValue("title", comment.title);
      setValue("content", comment.content);
      setSelectedStars(comment.stars);
    }
  }, [comment, setValue]);

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Dein Kommentar wird als "bearbeitet" makiert.</div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={
        <div className="flex flex-col gap-2">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Heading
              title="Bewertung und Rezension bearbeiten"
              subtitle="Ändere deine Gedanken!"
            />
            <Input
              id="title"
              label="Titel *"
              disabled={loading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="content"
              label="Inhalt *"
              disabled={loading}
              register={register}
              errors={errors}
              required
            />

            {/* Sterne-Bewertung */}
            <div className="flex items-center gap-2">
              <span className="font-thin text-gray-500">Sterne *: </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-3xl ${
                    selectedStars >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
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
      actionLabel="Speichern"
      disabled={loading}
    />
  );
};
