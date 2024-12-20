import { useRef } from "react";
import hamburger from "../assets/Hamburger.svg";
import usePanelOpen from "../lib/hooks/usePanelOpen";
import { navLinks } from "../constants";
import { useNavigate } from "react-router-dom";

const HamburgerMenu = () => {
  //
  ////DATA
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  //custom hook
  const { open, setOpen } = usePanelOpen({ refValue: menuRef });

  //   const handleClick = (id: string) => {
  //     // Nawigacja do strony głównej
  //     navigate("/");

  //     // Przewinięcie do elementu o id "targetElement" po załadowaniu strony
  //     setTimeout(() => {
  //       const targetElement = document.getElementById(id);
  //       if (targetElement) {
  //         targetElement.scrollIntoView({ behavior: "smooth" });
  //       }
  //     }, 500); // opóźnienie, aby upewnić się, że strona się załadowała
  //   };

  return (
    <div ref={menuRef}>
      <img
        src={hamburger}
        alt="hamburger menu"
        width={24}
        height={24}
        onClick={() => setOpen(!open)}
        className="mr-4 min-w-[24px] cursor-pointer pb-[6px] hover:opacity-60 sm:min-w-[30px] min-[1192px]:hidden"
      />
      {open && (
        <ul className="absolute left-[15px] top-[100px] z-50 w-[130px] rounded-[5px] bg-white bg-opacity-90 pl-3 pt-1 ring-1 ring-black ring-opacity-20">
          <li
            onClick={() => navigate("/shop")}
            className="cursor-pointer pb-2 font-satoshi opacity-60 hover:opacity-100"
          >
            Shop
          </li>
          {navLinks.map((link, index) => (
            <li
              key={index}
              //   onClick={}
              className="cursor-pointer pb-2 font-satoshi opacity-60 hover:opacity-100"
            >
              {link.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HamburgerMenu;