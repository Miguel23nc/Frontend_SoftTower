import { useEffect, useState } from "react";
import WidgetStore from "./store";
import OpenStore from "./OpenStore";
import SelectedWidgets from "./SelecteWidget";
import { useAuth } from "../../context/AuthContext";

const Widgets = () => {
  const { user } = useAuth();
  const [showWidget, setShowWidget] = useState(false);
  const handleShowWidget = (value) => {
    setShowWidget(!value);
  };
  return (
    <div className="ml-20 pl-2  flex justify-center m-2 h-full">
      {user._id && <SelectedWidgets colaborador={user?._id} />}
      {showWidget && <WidgetStore show={showWidget} colaborador={user?._id} />}
      <OpenStore
        onclick={() => handleShowWidget(showWidget)}
        showWidget={showWidget}
      />
    </div>
  );
};

export default Widgets;
