const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { videoService } = require('../services')

const CreateVideo = catchAsync(async (req, res) => {
    const video = await videoService.createVideo(req.body)
    res.status(httpStatus.CREATED).send({ video })
})

const DeleteVideo = catchAsync(async (req, res) => {
    await videoService.deleteVideo(req.params.id)
    res.status(httpStatus.NO_CONTENT).send()
})

const GetVideos = catchAsync(async (req, res) => {
    const video = await videoService.getVideos()
    res.status(httpStatus.OK).send({ video })
})

const UpdateVideo = catchAsync(async (req, res) => {
    const video = await videoService.updateVideo(req.params.id, req.body)
    res.status(httpStatus.OK).send({ video })
})

const LikeVideo = catchAsync(async (req, res) => {
    const { id } = req.params
    const { token } = req.headers;
    const video = await videoService.likeVideo(id, token)
    res.status(httpStatus.OK).send({ video })
})

module.exports = {
    CreateVideo,
    DeleteVideo,
    GetVideos,
    UpdateVideo,
    LikeVideo
}
