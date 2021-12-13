import axiosClient from "./axiosClient";

const videoApi = {
  getVideos: () => {
    const url = `v1/videos/list`;
    return axiosClient.get(url);
  },
  likeVideo: (id, params) => {
    const url = `v1/videos/${id}/liked`;
    return axiosClient.post(url, params);
  },
};
export default videoApi;
