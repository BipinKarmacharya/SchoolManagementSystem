import particlesConfig from "/src/assets/JSON/particles-config.js"; // Adjust path if needed
import Particles from "@tsparticles/react";
import { useEffect, useState } from "react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return <Particles id={props.id} options={particlesConfig} />;
};

export default ParticlesComponent;