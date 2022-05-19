require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socket = require('socket.io');

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(cors({
    origin:"http://localhost:3000"
}));
app.use(express.json());                           /* This is new and allows JSON Objects to be posted */
app.use(express.urlencoded({ extended: true }));   /* This is new and allows JSON Objects with strings and arrays*/

require("./routes/user.routes")(app);
const server = app.listen(process.env.PORT, () => {
    console.log(`Listening at Port ${process.env.PORT}`)
})

const io = socket(server,{
    cors: {
        origin: 'http://localhost:3000',
        methods: [ 'GET', 'POST' ],
        allowedHeaders: [ '*' ],
        credentials: true,
    }
});

io.on("connection", (socket) => {
    console.log(`Server side socket id: ${socket.id}`);
    socket.on("added_new_movie", (data) => {
        console.log("In added_new_movie");
        console.log(data);
        socket.broadcast.emit("new_movie_added", data);
    });
    socket.on("deleted_movie", (data) =>{
        console.log("Movie Deleted - Movie ID:" + data);
        socket.broadcast.emit("movie_deleted", data);
    })
});