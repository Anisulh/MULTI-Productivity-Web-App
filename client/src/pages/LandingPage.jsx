import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import About from "../components/About";
import Features from "../components/Features";
import HeroNav from "../components/HeroNav";

function LandingPage() {
  const navigate = useNavigate();
  const homeRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  return (
    <div>
      <HeroNav
        homeRef={homeRef}
        featuresRef={featuresRef}
        aboutRef={aboutRef}
      />
      <Features featuresRef={featuresRef} />
      <About aboutRef={aboutRef} />
    </div>
  );
}

export default LandingPage;
