import { Link } from "react-router-dom";

const CardSideBar = ({ name, link, handleSubmit }) => {
  return (
    <Link
      to={`/home/${link}`}
      className="p-3 text-base pl-8 flex items-start w-full justify-start
    text-white hover:bg-slate-200 hover:text-black rounded-lg font-medium "
    >
      <button onClick={handleSubmit}>
        <ul className="list-none">
          <li className="list-none items-center ">{name}</li>
        </ul>
      </button>
    </Link>
  );
};

export default CardSideBar;
