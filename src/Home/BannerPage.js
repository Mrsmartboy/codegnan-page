
import React from 'react';
import bannerGirl from '../images/banner-girl.webp';
import Youtube from '../images/youtube.webp'
import { Helmet } from 'react-helmet';
import './BannerPage.css'
import StatsChart from './StatsChart'

const BannerPage =()=>{
    // const videoUrl = 'https://youtu.be/RlKgCehjw0M?si=j1qCaE-fQYGqfON-'


return(
    <div>
       <Helmet>
        <link rel="preload" href="../images/cover-bg.webp" as="image" />
        <link rel="preload" href={bannerGirl} as="image" />
      </Helmet>
<div className='coverpage-container'>
<div className='home-cover-text-container'>
  <div className='home-text-container'>
    <div className='home-titles'>
    <p className='home-title'>
      It's <span className='span-home-title'>Not Just</span> A Numbers
    </p>
    <p className='tag-line'>
      See Successful Students <span className='span-home-title'>Placements</span> Journey
    </p>
    </div>
    
  <div className="placement-card">
  <h1 className="student-count">
    3407<span className="plus-sign ">+</span>

  </h1>
  <p className="students-placed">Students Placed</p>


  <p className="counting"><span className='blinking'>&gt;&gt;&gt; Still Counting...!</span></p>   
    </div>
      
  </div>
  <div className='stats-studentplaced-container'>
    

     <StatsChart />

   <img src={Youtube} alt='youtube' className='custom-player' loading="lazy" />

  </div>
</div>

<div className='image-container'>
<img src={bannerGirl} 
    alt="Banner Girl" 
    className="banner-girl" 
    loading="lazy"
    />
</div>
</div>
</div>    
    )
}

export default BannerPage

