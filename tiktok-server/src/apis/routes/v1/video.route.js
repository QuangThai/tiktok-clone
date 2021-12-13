const express = require('express')

const { videoController } = require('../../controllers')

const router = express.Router()

router.delete('/:id', videoController.DeleteVideo)
router.patch('/:id', videoController.UpdateVideo)
router.get('/list', videoController.GetVideos)
router.post('/new', videoController.CreateVideo)
router.post('/:id/liked', videoController.LikeVideo)

module.exports = router
