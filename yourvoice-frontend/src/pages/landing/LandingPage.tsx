import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import RolesSection from "@/components/landing/RolesSection";
import TechSection from "@/components/landing/TechSection";
import WalkthroughSection from "@/components/landing/WalkthroughSection";
import ChallengesSection from "@/components/landing/ChallengesSection";
import ArchitectureFlowSection from "@/components/landing/ArchitectureFlowSection";

const LandingPage = () => {
   
    return (
        <div className="bg-slate-50 min-h-screen page-enter">

            <Navbar />

            <main>
                <HeroSection />
                <HowItWorksSection />
                <RolesSection />
                <TechSection />
                <ArchitectureFlowSection />
                <WalkthroughSection />
                <ChallengesSection />
            </main>

        </div>
    );
};

export default LandingPage;