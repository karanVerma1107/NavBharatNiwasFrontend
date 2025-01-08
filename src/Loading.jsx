import React from 'react'
import './loading.css'
import video from './logovideo.mp4'

const Loading = () => {
  return (
    <div className="loading-container">
      <video className="loading-video" src={video} autoPlay loop muted />
      <div className="loading-text">Loading...</div>
    </div>
  )
}

export default Loading