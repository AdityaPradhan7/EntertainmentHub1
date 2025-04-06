// src/components/ParticlesBackground.js
import { useEffect } from 'react';
import 'particles.js';

const ParticlesBackground = () => {
  useEffect(() => {
    window.particlesJS('particles-js', {
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.5
        },
        size: {
          value: 3
        },
        move: {
          enable: true,
          speed: 2
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          }
        }
      },
      retina_detect: true
    });
  }, []);

  return (
    <div
      id="particles-js"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default ParticlesBackground;
