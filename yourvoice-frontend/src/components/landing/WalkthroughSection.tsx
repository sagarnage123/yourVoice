import academicianInbox from "@/assets/landing/workflows/academician-inbox.png";
import academicianPublic from "@/assets/landing/workflows/academician-public.png";
import academicianAllQueries from "@/assets/landing/workflows/academician-all-queries.png";

import adminAllowedIdentities from "@/assets/landing/workflows/admin-allowed-identities.png";
import adminAllowedIdentitiesService from "@/assets/landing/workflows/admin-allowed-identities-service.png";
import adminFlagged from "@/assets/landing/workflows/admin-flagged.png";
import adminLogs from "@/assets/landing/workflows/admin-logs.png";

import counsellorInbox from "@/assets/landing/workflows/counsellor-inbox.png";
import counsellorPublic from "@/assets/landing/workflows/counsellor-public.png";
import counsellorAllQueries from "@/assets/landing/workflows/counsellor-all-queries.png";

import studentInbox from "@/assets/landing/workflows/student-inbox.png";
import studentNewQuery from "@/assets/landing/workflows/student-newquery.png";
import studentPublic from "@/assets/landing/workflows/student-public.png";
import studentCreateQuery from "@/assets/landing/workflows/student-create-query.png";

import { useState } from "react";
import { AnimatePresence ,motion } from "framer-motion";

import WorkflowTourModal from "./WorkflowTourModal";

import {
    studentWorkflowTour,
    academicianWorkflowTour,
    counsellorWorkflowTour,
    adminWorkflowTour,
} from "./workflowTours";

const walkthroughs = [
    {
        role: "Student Workflow",
        description:
            "Students can anonymously submit concerns, manage inbox conversations, and interact through protected identity flows.",

        images: [
            {src: studentPublic, id: "student-public"},
            {src: studentNewQuery, id: "student-newquery"},
            {src: studentCreateQuery, id: "student-create-query"},
            {src: studentInbox, id: "student-inbox"},
        ],
    },

    {
        role: "Academician Workflow",
        description:
            "Academicians manage institutional communication through role-specific inbox and interaction systems.",

        images: [
            {src: academicianPublic, id: "academician-public"},
            {src: academicianAllQueries, id: "academician-all-queries"},
            {src: academicianInbox, id: "academician-inbox"},
        ],
    },

    {
        role: "Counsellor Workflow",
        description:
            "Counsellors handle structured communication and sensitive support interactions through protected workflows.",

        images: [
            {src: counsellorPublic, id: "counsellor-public"},
            {src: counsellorAllQueries, id: "counsellor-all-queries"},
            {src: counsellorInbox, id: "counsellor-inbox"},
        ],
    },

    {
        role: "Admin Workflow",
        description:
            "Administrators manage moderation systems, audit logs, flagged submissions, and allowed institutional identities.",

        images: [
            {src: adminAllowedIdentities, id: "admin-identities"},
            {src: adminAllowedIdentitiesService, id: "admin-allowed-identities-service"},
            {src: adminFlagged, id: "admin-flagged"},
            {src: adminLogs, id: "admin-logs"},
        ],
    },
];
const WalkthroughSection = () => {

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentTour, setCurrentTour] = useState<
        {
            image: string;
            title: string;
            description: string;
        }[]
    >([]);

    const [currentStep, setCurrentStep] = useState(0);

    const startTour = (
        tour: {
            image: string;
            title: string;
            description: string;
        }[]
    ) => {
   
        setCurrentTour(tour);
        setCurrentStep(0);
        setIsModalOpen(true);
    };

    
    return (
        <section
            id="demo"
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
                        Platform Walkthrough
                    </p>

                    <h2 className="
                        mt-3
                        text-3xl
                        sm:text-4xl
                        font-bold
                        tracking-tight
                        text-slate-900
                    ">
                        Explore Institutional Workflows
                    </h2>

                    <p className="
                        mt-5
                        text-base
                        sm:text-lg
                        leading-8
                        text-slate-600
                    ">
                        YourVoice uses protected institutional access control and OTP-based authentication. The walkthrough below showcases how different roles interact with the platform through structured and secure communication workflows.
                    </p>

                </div>

                <div className="
                    mt-14
                    grid
                    gap-6
                    sm:grid-cols-2
                ">

                    {walkthroughs.map((workflow) => (
                        <div
                            key={workflow.role}
                            className="
                                    group
                                    flex
                                    flex-col
                                    rounded-3xl
                                    border
                                    border-slate-200
                                    bg-slate-50
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
    inline-flex
    items-center
    justify-center
    self-start
    rounded-xl
    border
    border-slate-200
    bg-white
    px-4
    py-2
    text-xs
    font-semibold
    tracking-wide
    text-slate-700
    shadow-sm
">
                                {workflow.role}
                            </div>

                            <div className="mt-6">

                                
                                    <div className="

            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
        ">

                                        {workflow.images.map((image) => (
                                            <div
                                                key={image.id}
                                                id={image.id}
                                                onClick={() => setSelectedImage(image.src)} 
                                                className="
                        aspect-16/10
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        cursor-pointer
                    "
                                            >
                                                <img
                                                    src={image.src}
                                                    alt={workflow.role}
                                                    className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-[1.02]
                        "
                                                />
                                            </div>
                                        ))}

                                    </div>

                            </div>

                            <p className="
                                mt-5
                                text-sm
                                leading-7
                                text-slate-600
                                flex-1
                            ">
                                {workflow.description}
                            </p>

                            <button
                                onClick={() => {

                                    if (workflow.role === "Student Workflow") {
                                        startTour(studentWorkflowTour);
                                    }

                                    if (workflow.role === "Academician Workflow") {
                                        startTour(academicianWorkflowTour);
                                    }

                                    if (workflow.role === "Counsellor Workflow") {
                                        startTour(counsellorWorkflowTour);
                                    }

                                    if (workflow.role === "Admin Workflow") {
                                        startTour(adminWorkflowTour);
                                    }

                                }}
                             className="
                                mt-8
                                w-full
                                rounded-xl
                                bg-slate-900
                                px-5
                                py-3
                                text-sm
                                font-medium
                                text-white
                                transition
                                hover:bg-slate-800
                            ">
                                Start Interactive Tour
                            </button>

                        </div>
                    ))}

                </div>

            </div>
            <AnimatePresence>
            {selectedImage && (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                    onClick={() => setSelectedImage(null)}
                    className="
            fixed
            inset-0
            z-100
            flex
            items-center
            justify-center
            bg-black/70
            p-4
            backdrop-blur-sm
            animate-in
            fade-in
            duration-200
        "
                >

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="
                w-full
                max-w-6xl
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white
                shadow-2xl
            "
                    >

                        <img
                            src={selectedImage}
                            alt="Expanded workflow"
                            className="
                    h-full
                    w-full
                    object-contain
                "
                        />

                    </div>

                </motion.div>
            )}    
            </AnimatePresence>

            <WorkflowTourModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                steps={currentTour}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
            />
        </section>
    );
};

export default WalkthroughSection;