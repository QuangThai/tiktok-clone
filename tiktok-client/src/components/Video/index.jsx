import React, { useEffect, useRef, useState } from "react";
import useElementOnScreen from "../../hooks/useElementOnScreen";
import useIntersection from "../../hooks/useIntersection";
import VideoFooter from "../VideoFooter";
import VideoSidebar from "../VideoSidebar";
import "./style.css";

function Video({ url, channel, description, song, likes, messages, shares }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };

  const isVisibile = useElementOnScreen(options, videoRef);

  useEffect(() => {
    if (isVisibile && videoRef.current) {
      if (!playing) {
        videoRef.current.play();
        setPlaying(true);
      }
    } else {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  }, [isVisibile]);

  const onVideoPress = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="video">
      <video
        className="video__player"
        loop
        onClick={onVideoPress}
        ref={videoRef}
        src={url}
      />
      <VideoFooter channel={channel} description={description} song={song} />
      <VideoSidebar likes={likes} messages={messages} shares={shares} />
    </div>
  );
}

export default Video;
