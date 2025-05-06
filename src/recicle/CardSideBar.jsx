import { Link } from "react-router-dom";

const CardSideBar = ({ name, modulo, link, handleSubmit }) => {
  return (
    <Link
      to={`/${modulo}/${link}`}
      className="p-3 transition-all  text-base pl-8 flex items-start w-full justify-start
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
