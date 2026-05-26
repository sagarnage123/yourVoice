import studentPublic from "@/assets/landing/workflows/student-public.png";
import studentInbox from "@/assets/landing/workflows/student-inbox.png";
import studentNewQuery from "@/assets/landing/workflows/student-newquery.png";
import createQuery from "@/assets/landing/workflows/student-create-query.png";

import adminAllowedIdentities from "@/assets/landing/workflows/admin-allowed-identities.png";
import adminAllowedIdentitiesService from "@/assets/landing/workflows/admin-allowed-identities-service.png";
import adminFlagged from "@/assets/landing/workflows/admin-flagged.png";
import adminLogs from "@/assets/landing/workflows/admin-logs.png";

import academicianPublic from "@/assets/landing/workflows/academician-public.png";
import academicianInbox from "@/assets/landing/workflows/academician-inbox.png";
import academicianAllQueries from "@/assets/landing/workflows/academician-all-queries.png";

import counsellorPublic from "@/assets/landing/workflows/counsellor-public.png";
import counsellorInbox from "@/assets/landing/workflows/counsellor-inbox.png";
import counsellorAllQueries from "@/assets/landing/workflows/counsellor-all-queries.png";

import requestOtp from "@/assets/landing/workflows/request-otp.png";
import verifyOtp from "@/assets/landing/workflows/verify-otp.png";

export const studentWorkflowTour = [
    {
        image: requestOtp,
        title: "Institution-Restricted OTP Access",
        description:
            "OTP requests are only allowed for institution-approved identities managed by administrators. This prevents unauthorized external access while maintaining controlled onboarding workflows.",
    },

    {
        image: verifyOtp,
        title: "Secure OTP Verification",
        description:
            "OTP verification adds a protected authentication layer before platform access is granted, ensuring that communication remains restricted to verified institutional members.",
    },

    {
        image: studentPublic,
        title: "Anonymous Institutional Discussions",
        description:
            "Students can safely explore public institutional discussions and interact without exposing their identity publicly, encouraging honest communication within academic environments.",
    },

    {
        image: studentNewQuery,
        title: "Anonymous Query Submission",
        description:
            "Students can anonymously raise concerns, feedback, or institutional issues without fear of exposure to a specific individual(Counsellor,Academician), encouraging safer and more transparent communication.",
    },
    {
        image: createQuery,
        title: "Structured Query Creation",
        description:
            "The query creation process allows students to provide necessary context and details while maintaining anonymity, ensuring that concerns are communicated effectively within institutional workflows.",
    },
    {
        image: studentInbox,
        title: "Protected Communication Inbox",
        description:
            "The inbox system allows students to receive replies and manage conversations while preserving identity abstraction and secure interaction flows.",
    },

];

export const academicianWorkflowTour = [
    {
        image: requestOtp,
        title: "Restricted Institutional Access",
        description:
            "Academician onboarding is limited to administrator-approved institutional identities, ensuring that only verified faculty members can access protected workflows.",
    },

    {
        image: verifyOtp,
        title: "Protected Faculty Verification",
        description:
            "OTP-based verification provides secure role authentication before access to institutional communication systems is granted.",
    },

    {
        image: academicianPublic,
        title: "Institutional Communication Feed",
        description:
            "Academicians can monitor student discussions and institutional interactions through a structured communication environment.",
    },
    {
        image: academicianAllQueries,
        title: "Structured Query Management",
        description:
            "Academicians can review and respond to institutional concerns through organized communication and moderation workflows.",
    },

    {
        image: academicianInbox,
        title: "Faculty Inbox Workflow",
        description:
            "Inbox workflows help academicians manage communication efficiently while maintaining controlled and role-specific access permissions.",
    },

];

export const counsellorWorkflowTour = [
    {
        image: requestOtp,
        title: "Restricted Counsellor Access",
        description:
            "Counsellor onboarding is protected through institution-approved identity management and controlled verification workflows.",
    },

    {
        image: verifyOtp,
        title: "Secure Counsellor Authentication",
        description:
            "OTP authentication ensures that sensitive support systems remain accessible only to verified institutional counsellors.",
    },

    {
        image: counsellorPublic,
        title: "Protected Support Communication",
        description:
            "Counsellors can monitor institutional interactions and identify conversations requiring structured emotional or academic support.",
    },
    {
        image: counsellorAllQueries,
        title: "Support-Oriented Query Review",
        description:
            "Structured workflows help counsellors review and manage support-related concerns within institutional communication systems.",
    },

    {
        image: counsellorInbox,
        title: "Sensitive Conversation Handling",
        description:
            "The protected inbox enables counsellors to manage confidential communication workflows responsibly and securely.",
    },

];

export const adminWorkflowTour = [
    {
        image: requestOtp,
        title: "Restricted Administrative Access",
        description:
            "Administrative onboarding is strictly restricted to institution-approved identities managed through protected access-control workflows.",
    },

    {
        image: verifyOtp,
        title: "Protected Administrative Authentication",
        description:
            "OTP verification adds an additional security layer before granting access to moderation systems and institutional controls.",
    },

    {
        image: adminAllowedIdentities,
        title: "Institutional Identity Control",
        description:
            "Administrators manage approved institutional identities that are allowed to request authentication and access protected platform workflows.",
    },

    {
        image: adminAllowedIdentitiesService,
        title: "Identity Verification Infrastructure",
        description:
            "Backend identity-management services help enforce controlled onboarding and maintain secure institution-level access restrictions.",
    },

    {
        image: adminFlagged,
        title: "Moderation & Safety Workflows",
        description:
            "Flagged communication workflows allow administrators to review potentially harmful or sensitive submissions while maintaining platform integrity.",
    },

    {
        image: adminLogs,
        title: "Administrative Accountability Tracking",
        description:
            "Audit logging systems maintain traceability of administrative actions, moderation activities, and protected platform operations.",
    },
];
