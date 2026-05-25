const steps = [
    {
        title: "Anonymous Student Submission",
        description:
            "Students can safely share concerns, feedback, or queries without exposing their identity publicly.",
    },
    {
        title: "Protected Identity Handling",
        description:
            "The platform securely processes identity-linked information while maintaining controlled institutional access.",
    },
    {
        title: "Academician & Counsellor Workflows",
        description:
            "Authorized academicians and counsellors can manage conversations through role-specific protected dashboards.",
    },
    {
        title: "Administrative Moderation",
        description:
            "Administrators review flagged submissions, manage allowed identities, and maintain platform integrity.",
    },
];
const HowItWorksSection = () => {
    return (
        <section
            id="platform"
            className="py-20 sm:py-24"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="max-w-3xl mx-auto text-center lg:text-left lg:mx-0">
                    <p className="
                        text-sm
                        font-medium
                        tracking-wide
                        uppercase
                        text-slate-500
                    ">
                        Platform Flow
                    </p>

                    <h2 className="
                        mt-3
                        text-3xl
                        sm:text-4xl
                        font-bold
                        tracking-tight
                        text-slate-900
                    ">
                        How YourVoice Works
                    </h2>

                    <p className="
                        mt-5
                        text-base
                        sm:text-lg
                        leading-8
                        text-slate-600
                    ">
                        YourVoice combines anonymous communication with structured moderation and protected identity handling to create a safer and more trustworthy interaction system.
                    </p>
                </div>

                <div className="
                    mt-14
                    grid
                    gap-6
                    md:grid-cols-2
                ">

                    {steps.map((step, index) => (
                        <div
                            key={step.title}
                            className="
                               group
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                            p-6
                            shadow-sm
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-xl
                            hover:border-slate-300
                                                        "
                        >

                            <div className="
                               flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-slate-900
                                text-sm
                                font-semibold
                                text-white
                                transition-transform
                                duration-300
                                group-hover:scale-110
                            ">
                                {index + 1}
                            </div>

                            <h3 className="
                                mt-6
                                text-lg
                                font-semibold
                                text-slate-900
                                transition-colors
                                duration-300
                                group-hover:text-slate-700
                            ">
                                {step.title}
                            </h3>

                            <p className="
                                mt-3
                                text-sm
                                leading-7
                                text-slate-600
                            ">
                                {step.description}
                            </p>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
};

export default HowItWorksSection;