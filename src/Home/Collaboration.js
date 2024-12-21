import React, { useEffect, useRef } from 'react';

// import GEC from '../images/GEC.webp';
// import KBN from '../images/KBN.webp';
// import KIT from '../images/KIT.webp';
// import LBC from '../images/LBC.webp';
// import NEC from '../images/NEC.webp';
// import SECV from '../images/SECV.webp';
// import VIJAYAWADA from '../images/VIJAYAWADA.webp';
// import LOYOLA from '../images/LOYOLA.webp';

import './Collaboration.css';

const Collaboration = () => {
  const carouselRef = useRef(null);

  const collaborationList = [
    { id: 1, image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734774540/GEC_oqmogk.png", alt: 'GEC' },
    { id: 2, image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734774543/KBN_exknal.png", alt: 'KBN' },
    { id: 3, image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734774544/KIT_j0qmdb.png", alt: 'KIT' },
    { id: 4, image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734774544/LBC_kfgnqb.png", alt: 'LBC' },
    { id: 5, image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734774551/NEC_mansna.png", alt: 'NEC' },
    { id: 6, image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734774556/SECV_i0ao0g.png", alt: 'SEC' },
    { id: 7, image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734774564/VIJAYAWADA_oipbm8.png", alt: 'Vijayawada' },
      { id: 8, image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734774547/LOYOLA_wuygdr.png", alt: 'LOYOLA' },
      { id: 9, image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734774540/GEC_oqmogk.png", alt: 'GEC' },
      { id: 10, image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734774543/KBN_exknal.png", alt: 'KBN' },
      { id: 11, image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734774544/KIT_j0qmdb.png", alt: 'KIT' },
      { id: 12, image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734774544/LBC_kfgnqb.png", alt: 'LBC' },
      { id: 13, image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734774551/NEC_mansna.png", alt: 'NEC' },
      { id: 14, image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734774556/SECV_i0ao0g.png", alt: 'SEC' },
   

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
