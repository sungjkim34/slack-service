module.exports = function (app, io, moment, logger) {
    app.get('/chat', function (req, res) {
        res.send('hi');
    });

    io.on('connection', socket => {
        socket.on('sendMessage', message => {
            console.log(message);
            io.sockets.emit('sendMessage', message);
        });
    });

    // io.on('connection', socket => {
    //     socket.on('sendMessage', message => {
    //         const { messageText, authorId, authorType, authorFirstName, authorLastName } = message;
    //         const messageDate = moment(message.messageDate).format('YYYY-MM-DD HH:mm:ss');
    //         var sql = 'INSERT INTO chats (messageText, messageDate, authorId, authorType, authorFirstName, authorLastName) VALUES (\'' + messageText + '\', \'' + messageDate + '\', \'' + authorId + '\', \'' + authorType + '\', \'' + authorFirstName + '\', \'' + authorLastName + '\')';
    //         con.query(sql, (err, result) => {
    //             if (err) {
    //                 logger.debug(err);
    //                 res.send(err);
    //             }
    //             message.messageDate = messageDate;
    //             message.id = result.insertId;
    //             const sendMessage = Object.assign({}, {socketId: socket.id, message});
    //             io.sockets.emit('sendMessage', sendMessage);
    //         });
    //     });
    // });
}