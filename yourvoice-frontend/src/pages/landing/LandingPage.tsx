import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import RolesSection from "@/components/landing/RolesSection";
import TechSection from "@/components/landing/TechSection";
import WalkthroughSection from "@/components/landing/WalkthroughSection";

const LandingPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen">

            <Navbar />

            <main>
                <HeroSection />
                <HowItWorksSection />
                <RolesSection />
                <TechSection />
                <WalkthroughSection />
            </main>

        </div>
    );
};

export default LandingPage;