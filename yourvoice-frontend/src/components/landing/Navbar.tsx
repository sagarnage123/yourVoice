const Navbar = () => {
    return (
        <header className="
            sticky
            top-0
            z-50
            px-4
            pt-4
        ">

            <div className="
                max-w-7xl
                mx-auto
            ">

                <div className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white/90
                    backdrop-blur-xl
                    px-5
                    sm:px-6
                    h-16
                    shadow-sm
                ">

                    <div className="
                        text-lg
                        font-semibold
                        tracking-tight
                        text-slate-900
                    ">
                        yourVoice
                    </div>

                    <nav className="
                            hidden
                            md:flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            p-1
                        ">

                        <a
                            href="#platform"
                            className="
                               rounded-lg
px-4
py-2
text-sm
font-medium
text-slate-600
transition-all
duration-200
hover:bg-white
hover:text-slate-900
hover:shadow-sm
                                                            "
                        >
                            Platform
                        </a>

                        <a
                            href="#roles"
                            className="
                               rounded-lg
px-4
py-2
text-sm
font-medium
text-slate-600
transition-all
duration-200
hover:bg-white
hover:text-slate-900
hover:shadow-sm
                            "
                        >
                            Roles
                        </a>

                        <a
                            href="#architecture"
                            className="
                               rounded-lg
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-slate-600
                                transition-all
                                duration-200
                                hover:bg-white
                                hover:text-slate-900
                                hover:shadow-sm
                                                            "
                        >
                            Architecture
                        </a>

                    </nav>

                    <a
                        href="#demo"
                        className="
        
        sm:inline-flex
        items-center
        justify-center
        rounded-xl
        bg-slate-900
        px-5
        py-2.5
        text-sm
        font-medium
        text-white
        transition-all
        duration-200
        hover:bg-slate-800
        hover:shadow-lg
    "
                    >
                        View Workflow
                    </a>

                </div>

            </div>

        </header>
    );
};

export default Navbar;