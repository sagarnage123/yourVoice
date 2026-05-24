const techItems = [
    "TypeScript-first architecture",
    "Role-based access control (RBAC)",
    "Protected identity workflows",
    "Secure authentication system",
    "Structured moderation flows",
    "Responsive modern UI",
    "Reusable component architecture",
    
];

const TechSection = () => {
    return (
        <section
            id="architecture"
            className="py-20 sm:py-24"
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
                        Engineering Focus
                    </p>

                    <h2 className="
                        mt-3
                        text-3xl
                        sm:text-4xl
                        font-bold
                        tracking-tight
                        text-slate-900
                    ">
                        Built With Production-Oriented Engineering
                    </h2>

                    <p className="
                        mt-5
                        text-base
                        sm:text-lg
                        leading-8
                        text-slate-600
                    ">
                        YourVoice was designed with real-world architectural thinking, secure workflows, maintainability, and scalable full-stack engineering practices.
                    </p>

                </div>

                <div className="
                    mt-14
                    grid
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-4
                ">

                    {techItems.map((item) => (
                        <div
                            key={item}
                            className="
                                group
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                px-5
                                py-5
                                text-sm
                                font-medium
                                text-slate-700
                                shadow-sm
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-lg
                                hover:border-slate-300
                            "
                        >
                            {item}
                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
};

export default TechSection;