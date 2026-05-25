const ArchitectureFlowSection = () => {
    return (
        <section
            id="architecture-flow"
            className="py-20 sm:py-24 bg-white"
        >

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="
                    max-w-3xl
                    mx-auto
                    text-center
                ">

                    <p className="
                        text-sm
                        font-medium
                        uppercase
                        tracking-wide
                        text-slate-500
                    ">
                        Platform Architecture
                    </p>

                    <h2 className="
                        mt-3
                        text-3xl
                        sm:text-4xl
                        font-bold
                        tracking-tight
                        text-slate-900
                    ">
                        Institutional Communication Flow
                    </h2>

                    <p className="
                        mt-5
                        text-base
                        sm:text-lg
                        leading-8
                        text-slate-600
                    ">
                        YourVoice uses protected onboarding, role-based workflows,
                        anonymous communication systems, and moderation infrastructure
                        to maintain secure institutional interactions.
                    </p>

                </div>

                    <div className="
    mt-16
    rounded-4xl
    border
    border-slate-200
    bg-slate-50
    p-6
    sm:p-8
    shadow-sm   
">

                        <div className="
        flex
        flex-col
        items-center
        gap-6
    ">

                            <div className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-6
            py-4
            text-center
            shadow-sm
        ">
                                <p className="
                text-lg
                font-semibold
                text-slate-900
            ">
                                    Allowed Identities
                                </p>

                                <p className="
                mt-2
                text-sm
                text-slate-600
            ">
                                    Institution-approved access control
                                </p>
                            </div>

                            <div className="h-10 w-px bg-slate-300" />

                            <div className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-6
            py-4
            text-center
            shadow-sm
        ">
                                <p className="
                text-lg
                font-semibold
                text-slate-900
            ">
                                    OTP Authentication
                                </p>

                                <p className="
                mt-2
                text-sm
                text-slate-600
            ">
                                    Restricted institutional onboarding
                                </p>
                            </div>

                            <div className="h-10 w-px bg-slate-300" />

                            <div className="
            rounded-2xl
            bg-slate-900
            px-8
            py-5
            text-center
            shadow-lg
        ">
                                <p className="
                text-xl
                font-semibold
                text-white
            ">
                                    Role-Based Access Control
                                </p>
                            </div>

                            <div className="
            grid
            w-full
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
        ">

                                {[
                                    "Students",
                                    "Academicians",
                                    "Counsellors",
                                    "Admin",
                                ].map((role) => (

                                    <div
                                        key={role}
                                        className={`
                        rounded-2xl
                        border
                        px-5
                        py-5
                        text-center
                        shadow-sm

                        ${role === "Admin"
                                                ? "border-blue-300/50 bg-blue-100/70 text-blue-950 backdrop-blur-sm"
                                                : "border-slate-200 bg-white text-slate-900"
                                            }
                    `}
                                    >
                                        <p className="
                        text-base
                        font-semibold
                    ">
                                            {role}
                                        </p>
                                    </div>

                                ))}

                            </div>

                            <div className="
            grid
            w-full
            gap-6
            lg:grid-cols-2
        ">

                                <div className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
            ">

                                    <p className="
                    text-lg
                    font-semibold
                    text-slate-900
                ">
                                        Anonymous Communication Layer
                                    </p>

                                    <p className="
                    mt-3
                    text-sm
                    leading-7
                    text-slate-600
                ">
                                        Students, academicians, and counsellors interact through protected communication workflows while preserving controlled identity abstraction.
                                    </p>

                                </div>

                            <div className="
                                rounded-2xl
                                border
                               border-blue-300/50 bg-blue-100/70
                                backdrop-blur-sm
                                p-6
                                shadow-sm
                            ">

                                    <p className="
                    text-lg
                    font-semibold
                
                    text-blue-950
                ">
                                        Moderation & Audit Infrastructure
                                    </p>

                                    <p className="
                    mt-3
                    text-sm
                    leading-7
                   text-blue-900/70
                ">
                                        Administrative systems manage flagged queries, moderation workflows, allowed identities, audit logging, and institutional accountability controls.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
        </section>
    );
};

export default ArchitectureFlowSection;