import * as http from 'http'

const server = http.createServer((request,response)=>{
    response.end("Hellow NodeJS!");
})

server.listen(8000);