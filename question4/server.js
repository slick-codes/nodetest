const http = require('http')
const controllers = require('./controllers/')




const server = http.createServer(function (req, res) {

    req.body = ''

    req.on('data', chunk => { req.body += chunk })
    req.on('end', function () { // Body parser callback
        try {
            req.body = JSON.parse(req.body)
        } catch (error) { }

        // get url params


        // handle POST request
        if ((req.url === '/boards' || req.url === '/boards/') && req.method === 'POST')
            return controllers.createBoard(req, res)

        // handle PUT request
        if (req.method === 'PUT') {
            const urlArr = req.url.split('/') // split url to array 
            const params = { id: urlArr[urlArr.length - 1] } // convert parsed id to params obj
            const extractedUrl = "/" + urlArr.splice(1, urlArr.length - 2).join('/') // reconstruct url

            if ((extractedUrl === '/boards' || extractedUrl === '/boards/') && params.id) {
                req.params = params
                return controllers.updateBoards(req, res)
            }



        }



    })


})

const PORT = process.env.PORT || 7000
console.log("")
server.listen(PORT, console.log('Server connected at port ', PORT))