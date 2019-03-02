const express = require('express')
const axios = require('axios')
const cors = require('cors')
const http = require('http')
const socketIo = require('socket.io')
require('dotenv').config()

const app = express() 
const base_url = "https://www.googleapis.com/youtube/v3/channels?part=statistics"

const killerkeem = "UC11PvrGPzo6Y7Zc6-e9cAKg"
const teaspill = "UCj-qit6AuiqQnHUnY3qLc3g"

const keem_endpoint = `${base_url}&id=${killerkeem}&key=${process.env.youtube_api}`
const teaspill_endpoint = `${base_url}&id=${teaspill}&key=${process.env.youtube_api}`

const server = http.Server(app)
const io = socketIo(server)

app.use(cors({orgin: 8080}));

let stats 
const getStats = async () => {
    const [{data: killerkeem}, {data: teaspill}] = await Promise.all([
        axios(keem_endpoint),
        axios(teaspill_endpoint)
    ])

stats = {
    keemstarStats: killerkeem.items[0].statistics, 
    teaspillStats: teaspill.items[0].statistics,

}

console.log({stats})
    io.emit("stats", stats)
    setTimeout(() => getStats(), 2500)
}
getStats()

app.get('/stats', (req, res) => {
    res.json({stats})
})



//app.get('/', (req, res) => {
//    res.json({message: "We did it reddit!"})
//})

const PORT = 4444
server.listen(PORT, () => console.log(`Server is ease dropping on port ${PORT}`))