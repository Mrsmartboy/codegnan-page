import React, { useState, useEffect } from "react";
import "./TestimonialsV.css"; 
import smileIcon from "../images/smile.webp"; 

const testimonials = [
  {
    id: 1,
    name: "PRIYAKA",
    review:
      "I completed a Python course at Codegnan under the guidance of Saketh sir, and his teaching style is so effective. He is explaining concepts so clearly. I highly recommend Codegnan for their excellent training. Thanks to Saketh sir and the entire Codegnan team!",
    image: "/image1.jpeg",
    className: "top-left", 
  },
  {
    id: 2,
    name: "JOHN",
    review:
      "The web development course at Codegnan has been life-changing! The instructors are incredibly knowledgeable, and the hands-on projects made learning so much more effective. Highly recommended!",
    image: "/image2.jpeg",
    className: "middle-left", 
  },
  {
    id: 3,
    name: "SARAH",
    review:
      "I’ve learned so much in the Data Science course. The content is well-structured, and the support I received was amazing. I now feel confident pursuing a career in data science. Thank you, Codegnan!",
    image: "/image3.jpeg",
    className: "bottom-left",
  },
  {
    id: 4,
    name: "MICHAEL",
    review:
      "Codegnan’s course on machine learning gave me the perfect foundation for my career. The instructors were always available to help, and the practical exercises helped me build a strong skill set.",
    image: "/image4.jpeg",
    className: "top-right", 
  },
  {
    id: 5,
    name: "EMILY",
    review:
      "I took the full-stack development course at Codegnan, and I’m now working at a tech company! The curriculum was comprehensive and up-to-date, and the support team was always there to guide me.",
    image: "/image5.jpeg",
    className: "middle-right", 
  },
  {
    id: 6,
    name: "DAVID",
    review:
      "The Python programming course was amazing. I learned so much and was able to apply the knowledge immediately. Codegnan’s teaching approach is very hands-on, which I loved.",
    image: "/image6.jpeg",
    className: "bottom-right", 
  },
  
  
];

const TestimonialsV = () => {
  const [current, setCurrent] = useState(0); 
  const [paused, setPaused] = useState(false); 
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused && hovered === null) {
        setCurrent((prev) => (prev + 1) % testimonials.length); 
      }
    }, 3000); 

    return () => clearInterval(interval); 
  }, [paused, hovered]);

  const handleMouseEnter = (id) => {
    setHovered(id); 
    setPaused(true); 
  };

  const handleMouseLeave = () => {
    setHovered(null); 
    setPaused(false); 
  };

  const testimonialIndex = hovered !== null ? testimonials.findIndex(t => t.id === hovered) : current;

  const testimonial = testimonials[testimonialIndex] || testimonials[0]; 

  return (
    <div className="testimonials-section">
      <h1 className="title">What Our Students Have To Say</h1>

      <div className={`testimonial-container ${paused ? "paused" : ""}`}>
        <div className={`circle-images ${paused ? "paused" : ""}`}>
          {testimonials.map((testimonial, index) => (
            <img
              key={testimonial.id}
              className={`circle-img ${testimonial.className} ${
                testimonialIndex === index ? "highlighted" : ""
              }`}
              src={testimonial.image}
              alt={`Student ${testimonial.name}`}
              onMouseEnter={() => handleMouseEnter(testimonial.id)} 
              onMouseLeave={handleMouseLeave} 
            />
          ))}
        </div>

        <div className="testimonial-card">
         

          <div className="card-content-wrapper">
            <div className="card-image">
              <img
                src={testimonial.image} 
                alt={testimonial.name}
              />
            </div>
            <div className="card-content">
              <h2 className="card-title">{testimonial.name}</h2>
              <div className="card-rating">★★★★★</div>
              <p className="card-description">{testimonial.review}</p>
            </div>
            <img src={smileIcon} alt="smile" className="smile-icon" width={35} height={35}/>
          </div>
          <div className="gradient top-right"></div>
          <div className="gradient bottom-left"></div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsV;
