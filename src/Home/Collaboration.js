import React, { useEffect, useRef } from 'react';

import GEC from '../images/GEC.webp';
import KBN from '../images/KBN.webp';
import KIT from '../images/KIT.webp';
import LBC from '../images/LBC.webp';
import NEC from '../images/NEC.webp';
import SECV from '../images/SECV.webp';
import VIJAYAWADA from '../images/VIJAYAWADA.webp';
import LOYOLA from '../images/LOYOLA.webp';

import './Collaboration.css';

const Collaboration = () => {
  const carouselRef = useRef(null);

  const collaborationList = [
    { id: 1, image: GEC, alt: 'GEC' },
    { id: 2, image: KBN, alt: 'KBN' },
    { id: 3, image: KIT, alt: 'KIT' },
    { id: 4, image: LBC, alt: 'LBC' },
    { id: 5, image: NEC, alt: 'NEC' },
    { id: 6, image: SECV, alt: 'SEC' },
    { id: 7, image: VIJAYAWADA, alt: 'Vijayawada' },
      { id: 8, image: LOYOLA, alt: 'LOYOLA' },
    { id: 9, image: KBN, alt: 'KBN' },
    { id: 10, image: KIT, alt: 'KIT' },

  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({
          left: -150, 
          behavior: 'smooth',
        });

        if (carouselRef.current.scrollLeft <= 0) {
          carouselRef.current.scrollTo({
            left: carouselRef.current.scrollWidth, 
            behavior: 'smooth',
          });
        }
      }
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="collaboration-container">
      <h1 className="collaboration-title">Our Collaboration</h1>
      <div className="collaboration-carousel" ref={carouselRef}>
        {collaborationList.map((eachItem) => (
          <div key={eachItem.id} className="collaboration-item">
            <img src={eachItem.image} alt={eachItem.alt} className="collaboration-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collaboration;
