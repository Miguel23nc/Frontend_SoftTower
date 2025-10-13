const AllNaves = () => {
  return (
    <div className="w-[90%] h-[180vh] flex flex-col justify-center bg-gray-100 p-4 mb-12 rounded-lg shadow-lg">
      <div className=" full m-2 h-[30%] flex bg-white justify-center items-center rounded-xl">
        <span className="text-blue-500 font-semibold text-xl">Nave 01</span>

        {/* <div className="flex bg-white justify-center items-center h-[30%] m-3 rounded-xl">
          <span className="text-blue-500 font-semibold text-xl">Nave 03</span>
        </div> */}
      </div>
      <div className="h-[70%] flex">
        <div className="w-[60%] h-[40%] bg-white m-2 rounded-xl  flex justify-center items-center">
          <span className="text-blue-500 font-semibold text-xl">Nave 03</span>
        </div>
        <div className="bg-white w-[40%] flex justify-center items-center h-[95%] m-2 rounded-xl">
          <span className="text-blue-500 font-semibold text-xl">Nave 02</span>
        </div>
      </div>
    </div>
  );
};

export default AllNaves;
