import express from 'express'
import cors from 'cors'
import { prisma } from './lib/db'

const app = express()
app.use(express.json())
app.use(cors())

app.get("/patient/user/:email", async (req, res) => {
    const email = req.params.email
    console.log(email)
    const user = await prisma.patient.findUnique({
        where: {
            email
        }
    })
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    return res.json(user)
})

app.post("/patient/user/create/:email", async (req, res) => {
    const email = req.params.email
    const city = req.body.city
    console.log(email, city)
    const user = await prisma.patient.create({
        data: {
            email,
            city
        }
    })
    if (!user) {
        return res.status(404).json({ message: "User Creation failed" })
    }
    return res.json(user)
})

app.listen(4000, () => console.log("Server is running on port 4000"))