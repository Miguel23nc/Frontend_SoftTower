import { useEffect, useState } from "react";
import Atajo from "./ItemWidget";
import { useDispatch, useSelector } from "react-redux";
import { getWidgetsPreference } from "../../redux/actions";
import PopUp from "../../recicle/popUps";
import useSendMessage from "../../recicle/senMessage";
import { useAuth } from "../../context/AuthContext";

const SelectedWidgets = ({ colaborador }) => {
  const dispatch = useDispatch();
  const allWidgetsPreference = useSelector((state) => state.widgetsPreference);
  const { updateWidgetPreference } = useAuth();
  const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [deshabilitar, setDeshabilitar] = useState(false);
  const sendMessage = useSendMessage();

  useEffect(() => {
    if (
      !allWidgetsPreference.widgets ||
      allWidgetsPreference.widgets.length === 0
    ) {
      dispatch(getWidgetsPreference(colaborador));
    }
  }, [dispatch, colaborador]);

  useEffect(() => {
    if (allWidgetsPreference?.widgets?.length > 0) {
      // Ordenamos por el campo "orden"
      const sorted = [...allWidgetsPreference.widgets].sort(
        (a, b) => a.orden - b.orden
      );
      setItems(sorted);
    }
  }, [allWidgetsPreference]);

  const handleDragStart = (e, index) => {
    if (!editMode) return;
    e.dataTransfer.setData("drag-item-index", index);
  };

  const handleDrop = (e, index) => {
    if (!editMode) return;
    const draggedItemIndex = e.dataTransfer.getData("drag-item-index");
    const tempItems = [...items];
    const draggedItem = tempItems[draggedItemIndex];

    tempItems.splice(draggedItemIndex, 1);
    tempItems.splice(index, 0, draggedItem);
    setItems(tempItems);
  };

  const handleDragOver = (e) => {
    if (!editMode) return;
    e.preventDefault();
  };

  const handleDelete = (index) => {
    const tempItems = [...items];
    tempItems.splice(index, 1);
    setItems(tempItems);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = async () => {
    setDeshabilitar(true);
    sendMessage("Guardando cambios...", "Espere");
    try {
      const updatedWidgets = items.map((item, index) => ({
        ...item,
      }));
      const data = {
        colaborador,
        widgets: updatedWidgets,
      };

      await updateWidgetPreference(data);
      setEditMode(false);
    } catch (error) {
      sendMessage(error, "Error");
    } finally {
      setDeshabilitar(false);
    }
  };

  return (
    <div style={{ padding: "20px" }} className="w-screen">
      <PopUp deshabilitar={deshabilitar} />
      <div className="flex justify-end px-4">
        {allWidgetsPreference?.widgets?.length > 0 && (
          <button
            onClick={toggleEditMode}
            className=" bg-gradient-to-tr from-gray-50 to-gray-200 hover:scale-105 active:shadow-inner transition-all duration-300 rounded-lg w-32 h-12 text-gray-700 font-semibold shadow-lg"
          >
            {editMode ? "Cancelar" : "Editar"}
          </button>
        )}
        {editMode && (
          <button
            onClick={handleSaveChanges}
            className=" bg-gradient-to-r from-[#2b5993] to-[#418fda] hover:scale-105 active:shadow-inner text-white transition-all duration-300 rounded-lg w-40 p-2  font-semibold shadow-lg ml-8 h-12"
          >
            Guardar cambios
          </button>
        )}
      </div>

      <div
        className={`grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-flow-row rounded-lg p-4 ${
          editMode ? " shadow-lg" : ""
        }`}
      >
        {items.map((item, index) => (
          <div className="relative" key={index}>
            <Atajo
              name={item?.widget?.name}
              ruta={`/home/${item?.widget?.name}`}
              draggable={editMode}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              style={{
                padding: "10px",
                margin: "15px",
                width: "95%",
                backgroundImage: `url(${item?.widget?.imagen})`,
              }}
            />
            {editMode && (
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedWidgets;
