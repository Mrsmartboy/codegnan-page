import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RotatingCarousel.css';
import questionImage from '../images/question-mark.webp';
import call from '../images/call.webp';
import spiral from '../images/spiral-bg.png'

const profiles = [
  { id: 1, package: '12 LPA', company: 'HCL', image: '/download.jpeg', alt: 'Image 1' },
  { id: 2, package: '12 LPA', company: 'Infosys', image: '/image1.jpeg', alt: 'Image 2' },
  { id: 3, package: '12 LPA', company: 'HCL', image: '/image2.jpeg', alt: 'Image 3' },
  { id: 4, package: '12 LPA', company: 'Infosys', image: '/image3.jpeg', alt: 'Image 4' },
  { id: 5, package: '12 LPA', company: 'HCL', image: '/image4.jpeg', alt: 'Image 5' },
  { id: 6, package: '12 LPA', company: 'Infosys', image: '/image5.jpeg', alt: 'Image 6' },
  { id: 7, package: '12 LPA', company: 'HCL', image: '/image6.jpeg', alt: 'Image 7' },
  { id: 8, package: '12 LPA', company: 'Infosys', image: '/image7.jpeg', alt: 'Image 8' },
  { id: 9, package: '12 LPA', company: 'HCL', image: '/image8.jpeg', alt: 'Image 9' },
  { id: 10, package: '12 LPA', company: 'HCL', image: '/image6.jpeg', alt: 'Image 7' },
  { id: 11, package: '12 LPA', company: 'Infosys', image: '/image7.jpeg', alt: 'Image 8' },
  { id: 12, package: '12 LPA', company: 'HCL', image: '/image8.jpeg', alt: 'Image 9' },
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
