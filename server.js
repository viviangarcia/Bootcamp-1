// Vivian Garcia
// CEN3031 Bootcamp Assignment #1

var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  /*
    Your request handler should send listingData in the JSON format as a response if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 
   */

   if(parsedUrl.pathname === '/listings' && request.method === 'GET'){
      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(JSON.stringify(listingData));
    } else{
      response.statusCode = 404;
      response.end('Bad gateway error');
    }

};

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */

  //Check for errors
  if (err) throw err;

  //Save the sate in the listingData variable already defined
  listingData = JSON.parse(data);

  //Creates the server
  var server = http.createServer(requestHandler)

  //Start the server
  server.listen(port, function() {
    //once the server is listening, this callback function is executed
    console.log('Server listening on: http://127.0.0.1:' + port);
  });

});







