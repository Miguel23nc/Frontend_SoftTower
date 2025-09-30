const AllNaves = () => {
  return (
    <div className="w-full h-full flex justify-center bg-gray-100 p-4 mb-12 rounded-lg shadow-lg">
      <div className=" w-[75%] h-[95%]  rounded-xl">
        <div className="flex bg-white justify-center items-center h-[30%] m-3 rounded-xl">
          <span className="text-blue-500 font-semibold text-xl">Nave 02</span>
        </div>
        {/* <div className="flex bg-white justify-center items-center h-[30%] m-3 rounded-xl">
          <span className="text-blue-500 font-semibold text-xl">Nave 03</span>
        </div> */}
      </div>
      <div className="bg-white w-[25%] flex justify-center items-center h-[95%] m-2 rounded-xl">
        <span className="text-blue-500 font-semibold text-xl">Nave 01</span>
      </div>
    </div>
  );
};

export default AllNaves;
