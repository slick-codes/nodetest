

//  function that handles getting the movies from the api
async function sendRequest(substr, pageNumber = 0) {
    const response = await fetch(`https://jsonmock.hackerrank.com/api/moviesdata/search/?Title=${substr}&page=${pageNumber}`, { method: "GET" })
    return await response.json()
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
    }
}

// handle input via terminal 
console.log('')
console.log("Please input your search query:")
process.stdin.on('data', function (query) {
    query = query.toString()
    console.log('Searching...')
    getMovies(query)
})