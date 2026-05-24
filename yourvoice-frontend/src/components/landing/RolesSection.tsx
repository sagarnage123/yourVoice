const roles = [
    {
        title: "Students",
        description:
            "Submit anonymous concerns, feedback, and queries through protected identity flows.",
        badge: "Anonymous Access",
    },
    {
        title: "Academicians",
        description:
            "Review and respond to student interactions through role-specific institutional dashboards.",
        badge: "Protected Workflow",
    },
    {
        title: "Counsellors",
        description:
            "Handle sensitive communication and support conversations with structured access control.",
        badge: "Secure Communication",
    },
    {
        title: "Administrators",
        description:
            "Manage allowed identities, moderation systems, flagged submissions, and platform integrity.",
        badge: "RBAC Control",
    },
];

const RolesSection = () => {
    return (
        <section
            id="roles"
            className="py-20 sm:py-24 bg-white"
        >

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="max-w-3xl mx-auto text-center lg:text-left lg:mx-0">

                    <p className="
                        text-sm
                        font-medium
                        uppercase
                        tracking-wide
                        text-slate-500
                    ">
                        Role Architecture
                    </p>

                    <h2 className="
                        mt-3
                        text-3xl
                        sm:text-4xl
                        font-bold
                        tracking-tight
                        text-slate-900
                    ">
                        Built Around Institutional Roles
                    </h2>

                    <p className="
                        mt-5
                        text-base
                        sm:text-lg
                        leading-8
                        text-slate-600
                    ">
                        YourVoice uses structured role-based workflows to maintain privacy, accountability, and secure communication across institutional environments.
                    </p>

                </div>

                <div className="
                    mt-14
                    grid
                    gap-6
                    sm:grid-cols-2
                    xl:grid-cols-4
                ">

                    {roles.map((role) => (
                        <div
                            key={role.title}
                            className="
                                group
                                rounded-3xl
                                border
                                border-slate-200
                                bg-slate-50
                                p-6
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-xl
                                hover:border-slate-300
                            "
                        >

                            <div className="
                                inline-flex
                                rounded-full
                                bg-white
                                border
                                border-slate-200
                                px-3
                                py-1
                                text-xs
                                font-medium
                                text-slate-700
                                shadow-sm
                            ">
                                {role.badge}
                            </div>

                            <h3 className="
                                mt-6
                                text-xl
                                font-semibold
                                text-slate-900
                                transition-colors
                                duration-300
                                group-hover:text-slate-700
                            ">
                                {role.title}
                            </h3>

                            <p className="
                                mt-4
                                text-sm
                                leading-7
                                text-slate-600
                            ">
                                {role.description}
                            </p>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
};

export default RolesSection;