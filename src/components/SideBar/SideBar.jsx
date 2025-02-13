import { Link } from "react-router-dom";
import OptionSideBar from "./OptionSideBar";
import useModulesAndSubModules from "./Links";

const SideBar = () => {
  const { links } = useModulesAndSubModules();
  const userOptions = links;

  return (
    <div
      className="bg-sky-600 border-r-2 border-slate-900 shadow-[4px_0_8px_rgba(128,128,128,0)] shadow-gray-300  bg-gradient-to-b from-[#455a6f] to-[#263241] fixed  z-50 items-center  flex flex-col 
         w-20  min-h-screen"
    >
      <div className=" w-18 flex justify-center items-center h-18 my-8 rounded-full">
        <Link to={"/home"}>
          <img src="/ISOTIPO SOFT TOWER.svg" width={66} height={66} alt="LOGO TOWER" />
        </Link>
      </div>
      <div>
        {userOptions.length > 0
          ? userOptions?.map((options, index) => (
              <OptionSideBar
                key={index}
                icon={<img src={`/${options.module}.png`} alt="icon" />}
                options={options}
              />
            ))
          : " "}
      </div>
    </div>
  );
};

export default SideBar;
