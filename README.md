# AJAX

This is the second topic I learn with jQuery, and [here](https://github.com/iwashun22/jQuery) is the previous lessons I had.

AJAX is Asynchronous JavaScript And XML. It allows us to get or send data from the http server.

People commonly use `GET` and `POST` request method, but there's more.
In this tutorial, I am going to just explain the basics to note and memorize myself.

## AJAX method

```js
$.ajax({
   type: 'GET', // Request method
   url: '/users-api', // URL 
   // in this case Im getting data from 
   //       http://localhost:<port>/users-api
   data: { ...json }, // the data to send, use for POST, PUT... method
   success: function() {
      
   }, // this will run if the request was succeeded
   error: function() {

   } // and this will run if the request was failed
})
```