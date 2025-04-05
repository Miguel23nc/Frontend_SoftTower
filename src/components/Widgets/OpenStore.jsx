const OpenStore = ({ onclick, showWidget }) => {
  return (
    <div
      onClick={onclick}
      className="fixed bottom-10 right-10 w-20 h-20 bg-gradient-to-r from-[#2b5993] to-[#418fda] text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-600 transition"
    >
      <span
        className={`absolute w-10 h-1 bg-white text-5xl font-bold leading-none  transition-transform duration-300 ${
          showWidget ? "rotate-45" : ""
        }`}
      ></span>

      <span
        className={`absolute w-10 h-1 text-5xl font-bold leading-none  bg-white transition-transform duration-300 ${
          showWidget ? "-rotate-45" : "rotate-90"
        }`}
      ></span>
    </div>
  );
};

export default OpenStore;
