const https = require('https')

//  function that handles getting the movies from the api
async function sendRequest(substr, pageNumber = 0) {

    const path = `https://jsonmock.hackerrank.com/api/moviesdata/search/?Title=${substr}&page=${pageNumber}`
    const options = {
        hostname: "jsonmock.hackerrank.com",
        path: path
    }
    // using promise to allow me use async await with the http module
    return new Promise(function (resolve, reject) {
        https.request(options, function (response) {
            var str = '';

            // parse chunk of data to str
            response.on('data', function (chunk) { str += chunk });
            // convert data to json
            response.on('end', function () { resolve(JSON.parse(str)) });
            // handle error
            response.on('error', (error) => reject(error))

        }).end();
    })
}

async function getMovies(substr = "") {
    try {
        // send initial http request
        const data = await sendRequest(substr)

        let movies = [...data.data]

        // get all movies in from the pages if the total_page is greater than 2
        for (let i = 1; i < data.total_pages; i++) {
            let nextPageData = await sendRequest(substr, i)
            movies = [...movies, ...nextPageData.data]
        }

        const titles = []
        movies.forEach(movie => titles.push(movie.Title)) // store all titles in the title variable
        console.log('')
        console.log(titles.sort().join('\n')) // sorting and converting the titles to string 
        console.log('')

    } catch (error) {
        console.log('something went wrong!')
        console.log(error)
    }
}

console.log('')
console.log("Please input your search query:")

// handle input via terminal 
process.stdin.on('data', function (query) {
    query = query.toString().trim()
    console.log('Searching...')
    getMovies(query)
})