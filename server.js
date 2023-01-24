const http = require('http');

const todos = [
    {id:1 , text :'todo one'},
    {id:2 , text :'todo two'},
    {id:3 , text :'todo three'},
    {id:4 , text :'todo four'}
];

const server = http.createServer(function (req ,res) {
    const {method ,url } = req;

    let body = [];

    req.on('data',chunk => {
        body.push(chunk);
    })
    .on('end' , () => {
        body = Buffer.concat(body).toString();

        // initializing the status code
        let statusCode = 404;

        // creating an object called response with a succes value  set to false and a data value set to null
        const response = {
            success: false,
            data:null,
            error : null
        }

        if (method === 'GET' && url === '/todos') {
            statusCode = 200
            response.success = true
            response.data = todos
        } else if(method === 'POST' && url ==='/todos') {
            const {id , text } =JSON.parse(body)

            if (!id || !text) {
                statusCode = 400;
                response.error = "please add and " + " 'id '" + "and a " + " 'text' ";
            } else {
                todos.push({id , text});
                statusCode =201
                response.success =true
                response.data = todos
            }
        }

        // HEADER RESPONSE 
        res.writeHead( statusCode ,{
            'Content-Type' : 'application/json',
            'X-powered-By' :'Node.js',
        })

        // SENDING RESPONSE WITH THE METHOD( GET , POST , ) AND THE URL ( '/' ) INTO A JSON FORMAT 
        res.end(
            JSON.stringify(response)
        );
    });

});

const PORT = 5000

server.listen(PORT , function () {
   console.log( `server runing on port ${PORT}`);
});