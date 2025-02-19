import { Link } from "react-router-dom";

const CardSideBar = ({ name, link, handleSubmit }) => {
  return (
    <button
      className="p-3 text-base pl-8 flex items-start w-full justify-start
    text-white hover:bg-slate-200 hover:text-black rounded-lg font-medium "
      onClick={handleSubmit}
    >
      <ul className="list-none">
        <Link to={`/home/${link}`}>
          <li className="list-none items-center ">{name}</li>
        </Link>
      </ul>
    </button>
  );
};

export default CardSideBar;
