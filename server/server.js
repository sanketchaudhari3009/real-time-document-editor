const mongoose = require("mongoose")
const Document = require("./Document")
//server
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})

const defaultValue = ""

const io = require('socket.io')(process.env.PORT, {
    cors: {
        origin: "https://real-time-document-collaborator.netlify.app",
        methods: ['GET', 'POST']
    }
});

io.on("connection", socket => {

    socket.on('get-document', async documentId => {
        const document = await findOrCreateDocument(documentId)
        // console.log('connected');
        socket.join(documentId)
        socket.emit('load-document', document.data)

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta)
        })

        socket.on('save-document', async data => {
            await Document.findByIdAndUpdate(documentId, { data })
        })
    })


})


async function findOrCreateDocument(id) {
    if (id == null) return

    const document = await Document.findById(id)
    if (document) return document
    return await Document.create({ _id: id, data: defaultValue })
}