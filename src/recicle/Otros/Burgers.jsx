const Burger = () => {
    return (
        <button>
            <div className=" bg-slate-100 justify-center 
                                    items-center 
                                    flex flex-col w-12 m-3 rounded-full h-12">
                <div className="w-5 m-0.5 bg-slate-600 
                                        hover:color-100 rounded-md h-1">
                </div>
                <div className="w-5 m-0.5 bg-slate-600 
                                        0 rounded-md h-1">
                </div>
                <div className="w-5 m-0.5 bg-slate-600 
                                        rounded-md h-1">
                </div>
            </div>
        </button>
    )
}

export default Burger