import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RotatingCarousel.css';
import questionImage from '../images/question-mark.webp';
import call from '../images/call.webp';
import spiral from '../images/spiral-bg.webp'

 import sathupatiPreethi from '../images/sathupati_preethi.webp';
 import sathupatiPreethi1 from '../images/sathupati_preethi_1.webp';
 import anuRajN from '../images/anu_raj_n.webp';
 import varuniBr from '../images/varuni_br.webp';
 import morampudiAnuSri from '../images/morampudu_anu_sri.webp';
 import kavyaC from '../images/kavya_c.webp';
 import mVijayaKrishna from '../images/m_vijaya_krishna.webp';
import bhargaviGHegde from '../images/bhargavi_g_hegde.webp';
 import sharathS from '../images/sharath_s.webp';
 import manuN from '../images/manu_n.webp';
import tShivani from '../images/t_shivani.webp';
import suhas from '../images/suhas.webp'

const profiles = [
   { id: 1, package: '18.2 LPA', company: 'Infosys', image: sathupatiPreethi, alt: 'sathupati_preethi' },
   { id: 2, package: '9.5 LPA', company: 'Infosys', image: sathupatiPreethi1, alt: 'sathupati_preethi_1' },
   { id: 3, package: '7.36 LPA', company: 'CodeYoung', image: anuRajN, alt: 'anu_raj_n' },
   { id: 4, package: '7 LPA', company: 'Healthsyst', image: varuniBr, alt: 'varuni-br' },
   { id: 5, package: '7 LPA', company: 'TCS', image: morampudiAnuSri, alt: 'morampudi_anu_sri' },
   { id: 6, package: '7 LPA', company: 'Healthsyst', image: kavyaC, alt: 'kavya_c' },
  { id: 7, package: '6.8 LPA', company: 'Berkshire', image: mVijayaKrishna, alt: 'm_vijaya_krishna' },
   { id: 8, package: '6.5 LPA', company: 'Aptean', image: bhargaviGHegde, alt: 'bhargavi_g_hegde' },
   { id: 9, package: '6.5 LPA', company: 'Aptean', image: sharathS, alt: 'sharath_s' },
   { id: 10, package: '6.5 LPA', company: 'Aptean', image: manuN, alt: 'manu_n' },
   { id: 11, package: '6.5 LPA', company: 'Aptean', image: tShivani, alt: 't_shivani' },
  { id: 12, package: '6.5 LPA', company: 'Aptean', image: suhas, alt: 'suhas' }
];


const RotatingCarousel = () => {
  const [angle, setAngle] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Function to calculate translation distance based on screen width
  const getTranslationDistance = () => {
    if (window.innerWidth < 476) return 150;
    if (window.innerWidth < 576) return 180;
    if (window.innerWidth < 796) return 200;
    if (window.innerWidth < 1025) return 230;
    if (window.innerWidth < 1285) return 190;
    if (window.innerWidth < 1580) return 240; // Mobile
    if (window.innerWidth <1850) return 230;
    if (window.innerWidth > 1850) return 300;
    return 200; // Desktops
  };
  const [translationDistance, setTranslationDistance] = useState(getTranslationDistance());

  // Update translation distance on window resize
  useEffect(() => {
    const handleResize = () => setTranslationDistance(getTranslationDistance());
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      const id = setInterval(() => {
        setAngle((prev) => prev + 30);
        setActiveIndex((prev) => (prev + 1) % profiles.length);
      }, 800);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [isHovered]);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    clearInterval(intervalId); // Stop rotation on hover
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Restart rotation after hover
  };

  return (
    <div className='main-container'>
      <img
        src={spiral} 
        alt="Spiral Background"
        className="spiral-bg"
      />
      <div className="carousel-container">
      
        <div className="carousel">
          {profiles.map((profile, index) => {
            const rotation = angle + (index * (360 / profiles.length));
            return (
              <div
                key={profile.id}
                className={`profile ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleClick(index)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `rotate(${rotation}deg) translate(${translationDistance}px) rotate(-${rotation}deg)`,
                  transition: 'transform 0.5s ease',
                }}
              >
                <span className='name'>
                  <span className='package'>{profile.package}</span> <br />
                  {profile.company}
                </span>
                <div className="highlight-circle">
                  <img src={profile.image} alt={profile.alt} className='rotate-img' />
                </div>
              </div>
            );
          })}
        </div>
        <div className="center-profile">
          <div className="highlight-circle">
            <img src={profiles[activeIndex].image} alt={profiles[activeIndex].alt} />
          </div>
          <span className='center-text'>
            <span className='package'>{profiles[activeIndex].package} </span> {profiles[activeIndex].company}
          </span>
        </div>
      </div>
      <div className="right-section-container">
       
        <div className='right-section'>
        <div className='text-next'>
          <div className="text-content">
            <p>
              After <span className="highlight">3281+</span> <br /> Successful Placed <br /> Students
            </p>
            <h1>WHO IS <br /> NEXT...</h1>
          </div>
          <img src={questionImage} alt="Question Mark" className="question-mark" max-height={120} width={250} />
          </div>
          <div className="callback-section">
            <Link to='/talk-to-career-expert' className='request-callback'>
            <button className="callback-button-rotating">
              <img src={call} alt="call" className='call' /> Request A Callback
            </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RotatingCarousel;
