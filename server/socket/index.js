module.exports = (io) => {
  const clients = {}
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    // clients[socket.id] = {userWords: [], computerWords: []}

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      // delete clients[id]
    });
  })
}
