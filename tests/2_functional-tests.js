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
      //to /api/threads/{board}.(Recomend res.redirect to board page /b/{board}) Saved will be _id, text, 
      //created_on(date&time), bumped_on(date&time, starts same as created_on), reported(boolean), 
      //delete_password, & replies(array).
     test('Posting thread', done => {
        chai.request(server)
        .post('/api/threads/testboard')
        .send({text: "text to test", delete_password: "del" })
        .end((err, res) => { 
          assert.equal(res.status, 200, 'Status OK')
          done()  
        })
      }) 
      
      
      
    })
    
    suite('GET', function() {
      //I can GET an array of the most recent 10 bumped threads on the board with only the most recent
      //3 replies from /api/threads/{board}. The reported and delete_passwords fields will not be sent.
    test('Posting thread', done => {
        chai.request(server)
        .get('/api/threads/testboard')
        .end((err, res) => { 
          assert.equal(res.status, 200, 'Status OK')
          assert.isArray(res.body)
          assert.isTrue(res.body.length <= 10)
          console.log(res.body)
          for (let i=0; i< res.body.length; i++) {
            console.log(i)
            assert.equal(res.body[i].delete_passwords, "asdf")
            assert.equal(res.body[i].reported, "")
          }
          done() 
        })
      })    
      
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
