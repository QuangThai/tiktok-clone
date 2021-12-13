const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const { toJSON, paginate } = require('./plugins')

const userSchema = mongoose.Schema(
    {
        displayName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email')
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number')
                }
            },
            private: true,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
            default: 'https://scontent.fdad1-1.fna.fbcdn.net/v/t1.6435-9/53803596_1068619629991403_5306749135808888832_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=0R34S8qo1IYAX-v00n_&_nc_ht=scontent.fdad1-1.fna&oh=00_AT8wxESUpF7LLyLgNg0t9m2xFv4hdxjq_cLjQlns2OFTUg&oe=61DE5919',
        },
        n_follows: {
            type: Number,
            default: 0,
        },
        followers: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
)

userSchema.plugin(toJSON)
userSchema.plugin(paginate)

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
    return !!user
}

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this
    return bcrypt.compare(password, user.password)
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema)

module.exports = User
