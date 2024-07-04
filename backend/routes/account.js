const express = require("express")
const { authMiddleware } = require("../middleware")
const { Account } = require("../db")
const { default: mongoose } = require("mongoose")

accountRouter = express.Router()

accountRouter.get('/balance', authMiddleware, async (req, res) => {
    const user = await Account.findOne({userId: req.userId})
    res.send({
        balance: user.balance
    })
})

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession()
    
    const to = req.body.to
    const amount = req.body.amount
    session.startTransaction()

    const fromAccount = await Account.findOne({userId: req.userId}).session(session)
    if (!fromAccount || fromAccount.balance < amount){
        await session.abortTransaction()
        res.send({
            message: "Insufficent balance/no account found"
        })
    }
    const toAccount = await Account.findOne({userId: to}).session()
    if (!toAccount){
        await session.abortTransaction()
        res.send({
            message: "Invalid account"
        })
    }

    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session)
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session)

    await session.commitTransaction()
    res.send({
        message: "Trasaction successfull"
    })
})

module.exports = accountRouter