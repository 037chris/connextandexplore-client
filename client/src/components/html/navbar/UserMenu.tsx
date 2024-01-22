import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../../Avatar";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";
import { useUserIDContext } from "../../../UserIDContext";
import Button from "../Button";
import { getUser, logout } from "../../../backend/boardapi";
import { HOST } from "../../../backend/getHostApi";
import { FaRegEnvelope } from "react-icons/fa";
import { MdOutlineGroups2 } from "react-icons/md";
import LoginModal from "./LoginModal";
import { AvatarContext } from "../../../actions/AvatarContext";
const port = 443;

const UserMenu: FC = () => {
  const reactContext = useContext(AvatarContext);
  const { state } = reactContext as any;
  const { dispatch } = useContext(AvatarContext) as any;

  const { userID } = useUserIDContext();
  const [isOpen, setIsOpen] = useState(false);

  const [authenticationModalIsOpen, setAuthenticationModalIsOpen] =
    useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = await getUser(userID || "");
        setProfilePicture(currentUser.profilePicture || "");
        dispatch({ type: "SET_AVATAR", payload: currentUser.profilePicture });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (userID) {
      fetchUserProfile();
    }
  }, [userID]);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const openAuthenticationModal = () => {
    setIsOpen(false);
    setAuthenticationModalIsOpen(true);
  };

  const onLogOut = () => {
    setIsOpen(false);
    sessionStorage.clear();
    logout();
    navigate(0);
  };

  const onCloseMenu = () => {
    setIsOpen(false);
  };

  const onBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    // Check if the related target (where the focus is moving to) is outside the menu
    if (
      containerRef.current &&
      !containerRef.current.contains(event.relatedTarget as Node)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="relative" ref={containerRef} onBlur={onBlur} tabIndex={0}>
        {userID ? (
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={() => {
                navigate("/chat");
              }}
              className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-md
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                    border-2
                    "
            >
              Chat
            </div>
            <div
              onClick={() => {
                navigate("/create-event");
              }}
              className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-md
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                    border-2
                    "
            >
              Event Erstellen
            </div>
            {/* <div><MdOutlineGroups2 size={25} /></div>
            <div><FaRegEnvelope size={20} /></div> */}

            <div
              onClick={toggleOpen}
              className="
                md:py-3
                md:px-3
                py-4
                px-4
                rounded-md
                border-2
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition"
            >
              <AiOutlineMenu />
              <div className="hidden md:block">
                <div className="avatar-box">
                  <Avatar
                    src={
                      state.avatarUrl
                        ? `${HOST}/images/users/${state.avatarUrl}`
                        : "/images/placeholder.jpg"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-3">
            <div className="w-24 md:w-32">
              <Button
                outline
                label="Anmelden"
                onClick={openAuthenticationModal}
              />
            </div>
            <div className="w-24 md:w-32">
              <Button
                primary
                label="Registrieren"
                onClick={() => navigate("/signup")}
              />
            </div>
          </div>
        )}

        {isOpen && (
          <div
            className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
        "
          >
            <div className="flex flex-col cursor-pointer" onClick={onCloseMenu}>
              <>
                <div className="md:hidden">
                  <MenuItem
                    onClick={() => {
                      navigate("/create-event");
                    }}
                    label="Event Erstellen"
                  />
                </div>
                <MenuItem onClick={() => navigate("/")} label="Home" />
                <MenuItem
                  onClick={() => navigate("/events")}
                  label="Event suchen"
                />
                {/* <MenuItem
                  onClick={() => navigate("/about")}
                  label="Mein Profil"
                /> */}
                <MenuItem
                  onClick={() => navigate("/my-created-events")}
                  label="Meine Events"
                />
                {/* <MenuItem onClick={() => { }} label="Nachrichten" /> */}
                <MenuItem
                  onClick={() => navigate("/yourevents")}
                  label="Meine Zusagen"
                />
                <div className="md:hidden">
                  <MenuItem
                    onClick={() => {
                      navigate("/chat");
                    }}
                    label="Chat"
                  />
                </div>
                <MenuItem
                  onClick={() => navigate("/settings")}
                  label="Einstellungen"
                />
                <MenuItem
                  onClick={() => navigate("/help")}
                  label="Hilfe / FAQ"
                />
                <hr />
                <MenuItem onClick={onLogOut} label="Ausloggen" />
              </>
            </div>
          </div>
        )}

        {/* Login Modal */}
        <LoginModal
          isOpen={authenticationModalIsOpen}
          onClose={() => setAuthenticationModalIsOpen(false)}
        />
      </div>
    </>
  );
};

export default UserMenu;
