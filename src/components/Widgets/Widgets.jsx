import { useEffect, useState } from "react";
import WidgetStore from "./store";
import OpenStore from "./OpenStore";
import SelectedWidgets from "./SelecteWidget";

const Widgets = () => {
  const [showWidget, setShowWidget] = useState(false);
  const handleShowWidget = (value) => {
    setShowWidget(!value);
  };
  return (
    <div className="ml-20 pl-2 space-x-10 flex justify-center m-2 h-full">
      <SelectedWidgets
      // selectedWidgets={selectedWidgets}
      // onDelete={handleDelete}
      />
      {showWidget && <WidgetStore show={showWidget} />}
      <OpenStore
        onclick={() => handleShowWidget(showWidget)}
        showWidget={showWidget}
      />
    </div>
  );
};

export default Widgets;
