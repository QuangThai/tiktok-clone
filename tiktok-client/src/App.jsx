import { useState, useEffect } from "react";
import Video from "./components/Video";
import "./App.css";
import videoApi from "./api/videoApi";
import { parserVideo } from "./helpers/parser-video";

function App() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchVideo = async () => {
      try {
        const response = await videoApi.getVideos();
        setVideos(parserVideo(response.video));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchVideo();
  }, []);

  return (
    // BEM
    <div className="app">
      <div className="app__videos">
        {isLoading ? (
          <div>Loading......</div>
        ) : (
          <>
            {videos?.map((video, index) => (
              <Video key={index} {...video} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
