import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
    initial: {
        opacity: 0,
        y: 12,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        y: 12,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
};
