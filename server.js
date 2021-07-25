const http = require("http");
const websocketServer = require("websocket").server;
const httpServer = http.createServer();
httpServer.listen(process.env.PORT || 5000 , ()=> console.log("Server Listening on Port 5000")) //port number 



const wsServer = new websocketServer({
    "httpServer" : httpServer //upgrading http request to ws request
})

wsServer.on("request", request =>{
//This request variable contains all the information about request configuration done by the user.
var x = JSON.stringify(request) 
x = JSON.parse(x)
console.log(x.httpRequest.url)
var qs = x.httpRequest.url;


const connection = request.accept(null, request.origin);
    connection.on("open", ()=> console.log("Connection Opened!"))
    connection.on("close", ()=> console.log("Connection Closed!"))
    connection.on("message", message => {
        console.log(message.utf8Data)
            //main logic
            var ms = message.utf8Data
            const count = ms.match(/[aeiou]/gi).length;
        var return_message = "Number of vowels in the word "+ms+" are "+count;
        connection.send(return_message);
        connection.send("Connect again to check for another word :) ")
        connection.close()


    })


    if(qs.includes("name")!==true)
    {const errorMessage = {
        "Error" : "Query parameter not found",
        "Description": "A query parameter with 'name' as key and your name as value is a required for connecting to this WebSocket Server"
    };
        connection.send(JSON.stringify(errorMessage))
        connection.send("Configure the request correctly and try to connect again")
        connection.close()
}
else if (qs.includes("&")===true)
{const errorMessage = {
    "Error" : "More than one Query parameter found",
    "Description": "Only one query parameter with 'name' as key and your name as value is allowed for connecting to this WebSocket Server"
};
    connection.send(JSON.stringify(errorMessage))
    connection.send("Configure the request correctly and try to connect again")
    connection.close()

}
else if (qs.slice(7)==="")
{const errorMessage = {
    "Error" : "Name not found",
    "Description": "Value of the query parameter passed ('name') is empty"
};
    connection.send(JSON.stringify(errorMessage))
    connection.send("Configure the request correctly and try to connect again")
    connection.close()

}
    else
   {connection.send("Server has started 🎉🎉🎉🎉 Your code is : "+getRandomNumber(8) + "( Please copy this code and keep it handy. It will be required during the submission )")
   connection.send("Now, send a word to the server to know the number of vowels in it")
} 
})

function getRandomNumber(digit) {
    return Math.random().toFixed(digit).split('.')[1];
}