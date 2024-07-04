const express = require("express")
const z = require("zod")
const jwt = require("jsonwebtoken")
const { User, Account } = require("../db")
const userRouter = express.Router()
const { JWT_SECRET } = require("../config")
const {authMiddleware} = require("../middleware")

userRouter.post('/signup', async (req, res) => {
    const body = req.body
    const userSignup = z.object({
        username: z.string().email(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string()
    })
    if (!userSignup.safeParse(body).success){
        res.status(411).send({
            message: "Incorrect inputs/Username already exists"
        })
        return
    }
    if (await User.findOne({username: body.username})){
        res.status(411).send({
            message: "Incorrect inputs/Username already exists"
        })
        return
    }
    const newUser = await User.create({
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password
    })
    const userId = newUser._id
    await Account.create({
        userId: userId,
        balance: 1 + Math.round(Math.random()*10000)
    })
    res.status(200).send({
        message: "User created successfully",
        token: jwt.sign({userId}, JWT_SECRET)
    })
})

userRouter.post('/signin', async (req, res) => {
    const body = req.body
    const userSignin = z.object({
        username: z.string().email(),
        password: z.string()
    })
    if (!userSignin.safeParse(body).success){
        res.status(411).send({
            message: "Incorrect inputs"
        })
        return
    }
    const user = await User.findOne({username: body.username, password: body.password})
    const userId = user._id
    if (user){
        res.send({
            token: jwt.sign({userId}, JWT_SECRET)
        })
    }else {
        res.send({
            message: "Error logging in"
        })
    }
})

userRouter.put('/', authMiddleware, async (req, res) => {
    const userUpdate = z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        password: z.string().optional()
    })
    if (!userUpdate.safeParse(req.body).success){
        res.status(411).send({
            message: "Incorrect inputs"
        })
    }
    await User.findByIdAndUpdate(req.userId, req.body)
    res.send({
        message: "Updated successfully"
    })
})

userRouter.get('/bulk', authMiddleware, async (req, res, next) => {
    const filter = req.query.filter || ""
    const exclude = req.userId
    const users = await User.find({
        $and: [{
                _id: { $ne: exclude}
            },
            { $or: [{
                firstName: {$regex: filter}
            },{
                lastName: {$regex: filter}
            }
            ]}
        ]
        
    }, { firstName: 1, lastName: 1, _id: 1 })
    console.log(users)
    res.send(users)
})

module.exports = userRouter