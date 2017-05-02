Simple node server
=============
Just something to start from when you need a simple server to make GET-requests or whatever

1. start the node server
`node app.js`

2. Test using something like `localhost:8081?encodedUri=https%3A%2F%2Fjsonplaceholder.typicode.com%2Fposts%2F1`

3. Call the server in your clientside javascript like this
```

var request = 'https://jsonplaceholder.typicode.com/posts/1';
var url= 'localhost:8081?encodedUri=' + encodeUriComponent(url);
$.get(url, function(data) {
  alert(data);
})
```