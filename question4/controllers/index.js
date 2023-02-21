let boardStore = []


module.exports.createBoard = function (req, res) {
    try {

        const response = {
            id: boardStore.length + 1,
            stage: 1,
            title: req.body.title
        }
        boardStore.push(response)

        res.writeHead(201, { "Content-Type": "application/json" })
        res.end(JSON.stringify(response))

        console.log(boardStore)

    } catch (error) {
        res.end('something went wrong!')
    }
}

module.exports.updateBoards = function (req, res) {
    try {
        req.params.id = Number(req.params.id)
        req.body.stage = Number(req.body.stage)

        if ([1, 2, 3].includes(req.body.stage)) { // check if stage is within the rage of 3

            boardStore = boardStore.map(board => { // iterate throw the array and update the object with id
                if (board.id === req.params.id)
                    return { ...board, stage: req.body.stage }

                return board
            })
            res.writeHead(200)
            res.end()

        } else {
            res.writeHead(400)
            res.end()
        }

    } catch (error) {
        res.end("something went wrong!")
    }
}