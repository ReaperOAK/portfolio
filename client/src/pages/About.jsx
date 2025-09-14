
import { useTheme } from "../contexts/ThemeContext";
import { useSEO, SEOHead, seoConfigs } from '../hooks/useSEO.jsx';
import HeroSection from "../components/about/HeroSection";
import StorySection from "../components/about/StorySection";
import ScrollFadeWrapper from "../components/ScrollFadeWrapper";
import PersonaSection from "../components/about/PersonaSection";
import FunFactsSection from "../components/about/FunFactsSection";
import SkillsConstellation from "../components/about/SkillsConstellation";
import EpiphanyCTA from "../components/about/EpiphanyCTA";

export default function About() {
  const { theme, themeVars } = useTheme();
  
  // SEO configuration
  const seoConfig = useSEO(seoConfigs.about);
  
  return (
    <>
      <SEOHead config={seoConfig} />
      <div
        data-theme={theme}
        style={{ background: themeVars.background, color: themeVars.foreground, minHeight: "100vh", width: "100%", ['--page-bg']: themeVars.background }}
      >
  <section className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center py-20 px-4 md:px-8 min-h-screen">
          <div className="flex-1 flex items-center justify-center">
            <HeroSection />
          </div>
          <div className="flex-1 flex items-stretch justify-center">
            {/* Constrain story column height and make it scrollable so many stories don't break layout */}
            <div className="w-full h-[60vh] md:h-[72vh] p-2 md:p-4 flex flex-col min-h-0">
              <ScrollFadeWrapper ariaLabel="Stories" className="h-full flex-1 min-h-0 self-stretch flex flex-col">
                <div className="min-h-0">
                  <StorySection />
                </div>
              </ScrollFadeWrapper>
            </div>
          </div>
        </section>
        <SkillsConstellation />
        <PersonaSection />
        <FunFactsSection />
        <EpiphanyCTA />
      </div>
    </>
  );
}
