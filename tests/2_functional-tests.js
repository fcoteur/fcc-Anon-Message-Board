/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      //I can POST a thread to a specific message board by passing form data text and delete_password 
      //to /api/threads/{board}.(Recomend res.redirect to board page /b/{board}) 
      //Saved will be _id, text, created_on(date&time), 
      //bumped_on(date&time, starts same as created_on), reported(boolean), delete_password, & replies(array).
      chai.request(server)
        .post('api/threads')
        .send({text: "text to test", delete_password: "del" })
        .end(function(err, res){
          console.log(err);  
        });
    });
    
    suite('GET', function() {
      //I can GET an array of the most recent 10 bumped threads on the board with only the most recent
      //3 replies from /api/threads/{board}. The reported and delete_passwords fields will not be sent.
       chai.request(server)
        .get('api/threads')
        .send({board: "testboard"})
        .end(function(err, res){
          console.log(err); 
        }); 
    });
    
    suite('DELETE', function() {
            

    });
    
    suite('PUT', function() {
        

    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
          

    });
    
    suite('GET', function() {
              

    });
    
    suite('PUT', function() {
           

    });
    
    suite('DELETE', function() {
             

    });
    
  });

});
