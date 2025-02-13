import ButtonOk from "../../../recicle/Buttons/Buttons";
import PopUp from "../../../recicle/popUps";
import useref from "../../../recicle/useRef";

const Delete = ({ setShowDelete, onclick }) => {
  const ref = useref(setShowDelete);

  return (
    <div
      ref={ref}
      className="fixed top-0 z-40 left-0 right-0 bottom-0 flex justify-center items-center"
    >
      <PopUp />
      <div className="flex flex-col  bg-white p-8 border-2 rounded-lg shadow-lg ">
        <div className="">
          <h1 className="p-4 font-bold text-red-600 text-center text-5xl">
            Alerta!
          </h1>
          <h1 className="p-4 text-center text-xl">
            ¿Está seguro que desea eliminarlo?
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <ButtonOk
            onClick={onclick}
            type="ok"
            styles={"!w-full m-4 flex justify-center mx-4"}
            classe={"!w-24"}
            children="SI"
          />
          <ButtonOk
            onClick={() => setShowDelete(false)}
            styles={"!w-full m-4 flex justify-center mx-4"}
            classe={"!w-24"}
            children="NO"
          />
        </div>
      </div>
    </div>
  );
};

export default Delete;
