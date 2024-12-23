import React, { useState } from 'react';
import './BannerPage.css';
import StatsChart from './StatsChart';

const BannerPage = () => {
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);

    const handleVideoLoad = () => {
        setIsPlayerVisible(true);
    };

    const videoId = "uTBlsOoiMQs"; // Extracted YouTube video ID

    return (
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
                        <p className="counting">
                            <span className='blinking'>&gt;&gt;&gt; Still Counting...!</span>
                        </p>
                    </div>
                </div>
                <div className='stats-studentplaced-container'>
                    <StatsChart />

                    {/* Lazy-loaded YouTube video */}
                    <div className="video-wrapper" style={{ width: '400px', height: '225px' }}>
                        {!isPlayerVisible ? (
                            <img
                            
                                src="https://res.cloudinary.com/db2bpf0xw/image/upload/v1734944177/youtube-video_afamyz.jpg"
                                alt="YouTube Thumbnail"
                                className="youtube-thumbnail"
                                style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                                onClick={handleVideoLoad}
                            />
                        ) : (
                            <iframe
                                width="400"
                                height="225"
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title="YouTube video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </div>
            </div>

            <div className='image-container'>
                <img
                
                    src="https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849439/banner-girl_i195ik.webp"
                    alt="Banner Girl"
                    className="banner-girl"
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default BannerPage;
