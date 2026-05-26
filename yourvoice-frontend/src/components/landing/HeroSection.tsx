import HeroPreview from "./HeroPreview";
import {useNavigate} from "react-router-dom";
const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <section className="relative py-16 sm:py-20 lg:py-28">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="
                    flex
                    flex-col
                    lg:flex-row
                    items-center
                    gap-14
                    lg:gap-16
                ">

                   
                    <div className="
                        flex-1
                        w-full
                        text-center
                        lg:text-left
                    ">

                        <div className="
                            inline-flex
                            items-center
                            rounded-full
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-1.5
                            text-sm
                            text-slate-600
                            shadow-sm
                        ">
                            Privacy-first communication platform
                        </div>

                        <h1 className="
                            mt-6
                            text-4xl
                            sm:text-5xl
                            lg:text-6xl
                            font-bold
                            tracking-tight
                            text-slate-900
                            leading-[1.1]
                        ">
                            Honest Communication.
                            <br />
                            Protected Identity.
                        </h1>

                        <p className="
                            mt-6
                            max-w-xl
                            mx-auto
                            lg:mx-0
                            text-base
                            sm:text-lg
                            leading-8
                            text-slate-600
                        ">
                            A privacy-focused anonymous communication platform built with secure role-based architecture, protected identity flows, and modern full-stack engineering.
                        </p>

                        <div className="
                            mt-10
                            flex
                            flex-col
                            sm:flex-row
                            gap-4
                            w-full
                            sm:w-auto
                            items-center
                            justify-center
                            lg:justify-start
                        ">

                            <button
                                onClick={() => navigate("/auth")}
                                className="
                                w-full
                                sm:w-auto
                                rounded-xl
                                bg-slate-900
                                px-6
                                py-3
                                text-sm
                                font-medium
                                text-white
                                transition
                                hover:bg-slate-800
                            "
                            >
                                Login Page
                            </button>

                            <a
                                href="#architecture"
                                className="
                                w-full
                                sm:w-auto
                                rounded-xl
                                border
                                border-slate-300
                                bg-white
                                px-6
                                py-3
                                text-sm
                                font-medium
                                text-slate-700
                                transition
                                hover:bg-slate-100
                            "
                            >
                                Explore Architecture
                            </a>

                        </div>

                    </div>

                   
                    <div className="
                        flex-1
                        w-full
                        flex
                        justify-center
                    ">

                             <HeroPreview />
                        

                    </div>

                </div>

            </div>

        </section>
    );
};

export default HeroSection;