const SelectedWidgets = ({ selectedWidgets, onDelete }) => {
  return (
    <div >
      <h1>aquí los widgets seleccionados</h1>
      {/* {selectedWidgets.map((widget) => (
        <div key={widget.id} className="selected-widget">
          <span>{widget.name}</span>
          <button onClick={() => onDelete(widget.id)}>Delete</button>
        </div>
      ))} */}
    </div>
  );
};

export default SelectedWidgets;
