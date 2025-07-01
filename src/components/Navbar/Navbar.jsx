import Logo from "../../assets/logomesa.png";

const Navbar = () => {
    return (
        <div>
            <nav className="bg-primary shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <img 
                                src={ Logo } 
                                alt="logo"
                                className="h-12 w-auto mr-3" 
                            />
                            <h1 className="font-bold text-white text-xl">
                                EH&S
                            </h1>        
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar