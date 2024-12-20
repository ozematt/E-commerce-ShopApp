import { useRef } from "react";
import userIcon from "../assets/Avatar.svg";
import usePanelOpen from "../lib/hooks/usePanelOpen";
import { useNavigate } from "react-router-dom";

const UserIcon = () => {
  //
  ////DATA
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const auth = localStorage.getItem("user") || undefined;

  //custom hook
  const { open, setOpen } = usePanelOpen({ refValue: panelRef });

  ////LOGIC
  const handleUserPanel = () => {
    if (!auth) {
      navigate("/login");
      return;
    }
    setOpen(!open);
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setOpen(false);
  };

  ////UI
  return (
    <div ref={panelRef}>
      <img
        src={userIcon}
        alt="user icon"
        width={24}
        height={24}
        onClick={handleUserPanel}
        className="cursor-pointer hover:opacity-60"
      />
      {open && (
        <ul className="absolute right-[-5px] top-[50px] z-50 w-[130px] rounded-[5px] bg-white bg-opacity-90 pl-3 pt-1 ring-1 ring-black ring-opacity-20">
          <li
            className="cursor-pointer pb-2 font-satoshi opacity-60 hover:opacity-100"
            // onClick={() => navigate("/shop")}
          >
            User Info
          </li>
          <li
            className="cursor-pointer pb-2 font-satoshi opacity-60 hover:opacity-100"
            // onClick={}
          >
            Purchase History
          </li>
          <li
            className="cursor-pointer pb-2 font-satoshi opacity-60 hover:opacity-100"
            onClick={handleLogOut}
          >
            {" "}
            Log Out
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserIcon;
