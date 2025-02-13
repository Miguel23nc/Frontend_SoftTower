import useref from "../../../recicle/useRef";
import ButtonOk from "../../../recicle/Buttons/Buttons";

const Edit = ({ setShowEdit, children, upDate }) => {
  const ref = useref(setShowEdit);
  return (
    <div
      ref={ref}
      className={`w-[95%]   h-[95%] bg-white  flex flex-col justify-center
    border-stone-500 border shadow-lg fixed top-5 z-40 rounded-xl `}
    >
      <div className="p-6 flex  flex-col h-[90%] space-y-4 overflow-y-auto">
        {children}
      </div>

      <div className="flex justify-end border-t p-3">
        <ButtonOk onClick={upDate} type="ok" children="Editar" />
        <ButtonOk onClick={() => setShowEdit(false)} children="Cancelar" />
      </div>
    </div>
  );
};

export default Edit;
