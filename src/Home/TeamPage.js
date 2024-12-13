import React from 'react';
import './TeamPage.css'; 
import LinkedinIcon from '../images/linkedin.webp';
import WhatsappIcon from '../images/whatsapp.webp';
import SairamImage from '../images/sairam.webp'; 
import SakethImage from '../images/saketh.webp';
import tickMark from '../images/tick-mark.webp'
import InstaIcon from '../images/insta.png'
import mark from '../images/mark.webp'

const TeamPage = () => {
  return (
    <div className="team-page">
      <header className="header">
        <h1 className='team-heading'>
          <img src={mark} alt='mark' className='mark' width={35} height={35}/>
           Meet Our Team Behind Codegnan</h1> 
           <a href="https://codegnan.com/our-team/" target="_blank" rel="noreferrer">
           <button className="all-team-btn"><span className='btn-span'>All Team Members &gt;&gt;</span></button>
            </a>
      </header>
      <div className='section-container'>
      <section className="team-members">
        <div className="team-card sairam">
          <img src={SairamImage} alt="Uppugundla Sairam" className="profile-pic" />
          <h2 className='sairam'>Uppugundla Sairam</h2>
          <p>Founder & Chief Executive Officer</p>
          <div className="social-icons-team">
          <a href="https://www.instagram.com/sairamuppugandla?igsh=MWVub3o5OXFvZWhvdA==" target="_blank" rel="noreferrer">
              <img src={InstaIcon} alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/in/sairam-uppugundla/" target="_blank" rel="noreferrer">
              <img src={LinkedinIcon} alt="LinkedIn" />
            </a>
            <a href="https://wa.me/message/V6KW6C7XJG6FK1" target="_blank" rel="noreferrer">
              <img src={WhatsappIcon} alt="whatsapp" />
            </a>
            
            
          </div>
        </div>
        <div className="team-card saketh">
          <img src={SakethImage} alt="Kallepu Saketh Reddy" className="profile-pic" />
          <h2 className='saketh-head'>Kallepu Saketh Reddy</h2>
          <p>Co-Founder and Chief Management Officer</p>
          <div className="social-icons-team">
          <a href="https://www.instagram.com/codewithsaketh?igsh=MTh4eXIzd21kaHRhYQ==" target="_blank" rel="noreferrer">
              <img src={InstaIcon} alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/in/saketh-codegnan/" target="_blank" rel="noreferrer">
              <img src={LinkedinIcon} alt="LinkedIn" width={30} height={30}/>
            </a>
            <a href="https://wa.me/message/V6KW6C7XJG6FK1" target="_blank" rel="noreferrer">
              <img src={WhatsappIcon} alt="whatsapp" />
            </a>
            
          </div>
        </div>
      </section>
      <section className="description">
        <h2>Our Top Notch Teams</h2>
        <h3>You Learn Programming<span>,<br/>Not Just Coding.</span></h3>
        <ul>
          <li>
          <img src={tickMark} alt="tickMark" className='tick-mark'/>
            Embark on a Journey with Elite Mentors - IIT Alumni and Top MNC Experts.</li>
          <li>
          <img src={tickMark} alt="tickMark" className='tick-mark'/>
            Experience Doubt-Free Learning from Product Developers.</li>
          <li>
          <img src={tickMark} alt="tickMark" className='tick-mark'/>
            Elevate Your Skills with Expert Masterclasses.</li>
        </ul>
      </section>
      </div>
    </div>
  );
};

export default TeamPage;
