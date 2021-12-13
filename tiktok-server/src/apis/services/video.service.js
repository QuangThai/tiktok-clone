const { Video } = require('../models')

/**
 * Create a task
 * @param {Object} taskBody
 * @returns {Promise<Task>}
 */
const createVideo = async (taskBody) => {
    return Video.create(taskBody)
}

const deleteVideo = async (taskId) => {
    return Video.deleteOne({ _id: taskId })
}

/**
 * Get a task
 * @param {Object} taskBody
 * @returns {Promise<Task>}
 */
const getVideos = async () => {
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean().populate({
        path: 'owner',
        select: 'displayName n_follows',
    })
    return videos
}

const updateVideo = async (id, videoBody) => {
    const video = await Video.findOne({ _id: id })

    Object.keys(videoBody).forEach((key) => {
        video[key] = videoBody[key]
    })
    await video.save()

    return video
}

const likeVideo = async (id, token) => {
    const video = await Video.findOne({ _id: id, likes: token })
    return video
}

module.exports = {
    createVideo,
    deleteVideo,
    getVideos,
    updateVideo,
    likeVideo,
}
