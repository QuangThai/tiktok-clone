const mongoose = require('mongoose')

const { toJSON, paginate } = require('./plugins')

const VideoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        source: {
            type: String,
            required: true,
        },
        n_likes: {
            type: Number,
            required: true,
            default: 0,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        n_comms: {
            type: Number,
            required: true,
            default: 0,
        },
        n_shares: {
            type: Number,
            required: true,
            default: 0,
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

VideoSchema.plugin(toJSON)
VideoSchema.plugin(paginate)

/**
 * @typedef Token
 */
const Video = mongoose.model('Video', VideoSchema)

module.exports = Video
