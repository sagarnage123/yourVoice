const challenges = [
    {
        title: "Restricted OTP Authentication",
        description:
            "Implemented institution-restricted OTP onboarding to ensure that only administrator-approved identities can access protected workflows.",
    },

    {
        title: "Role-Based Access Control",
        description:
            "Designed isolated workflow systems for students, academicians, counsellors, and administrators using protected role-specific routing and permissions.",
    },

    {
        title: "Anonymous Identity Abstraction",
        description:
            "Built communication workflows that preserve anonymity publicly while maintaining controlled backend identity mapping.",
    },

    {
        title: "Moderation & Audit Infrastructure",
        description:
            "Implemented moderation systems, flagged query handling, and audit logging workflows for accountability and platform integrity.",
    },
];

const ChallengesSection = () => {
    return (
        <section className="py-20 sm:py-24">

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
                        Engineering Challenges
                    </p>

                    <h2 className="
                        mt-3
                        text-3xl
                        sm:text-4xl
                        font-bold
                        tracking-tight
                        text-slate-900
                    ">
                        Built Beyond Basic CRUD Workflows
                    </h2>

                    <p className="
                        mt-5
                        text-base
                        sm:text-lg
                        leading-8
                        text-slate-600
                    ">
                        YourVoice focuses on institutional security, protected communication, moderation systems, and scalable role-based workflow architecture.
                    </p>

                </div>

                <div className="
                    mt-14
                    grid
                    gap-6
                    md:grid-cols-2
                ">

                    {challenges.map((challenge) => (
                        <div
                            key={challenge.title}
                            className="
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
                            "
                        >

                            <h3 className="
                                text-lg
                                font-semibold
                                text-slate-900
                            ">
                                {challenge.title}
                            </h3>

                            <p className="
                                mt-4
                                text-sm
                                leading-7
                                text-slate-600
                            ">
                                {challenge.description}
                            </p>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
};

export default ChallengesSection;