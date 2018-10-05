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
    
    let idTestThread,
        idTestThread2,
        delPwdTestThread;
    
    suite('POST', function() {
      //I can POST a thread to a specific message board by passing form data text and delete_password 
      //to /api/threads/{board}.(Recomend res.redirect to board page /b/{board}) Saved will be _id, text, 
      //created_on(date&time), bumped_on(date&time, starts same as created_on), reported(boolean), 
      //delete_password, & replies(array).
     test('Posting thread#1', done => {
        chai.request(server)
        .post('/api/threads/testboard')
        .send({text: "text to test", delete_password: "del" })
        .end((err, res) => { 
          assert.equal(res.status, 200, 'Status OK')
          assert.equal(res.body.delete_password, "del")
          assert.equal(res.body.text, "text to test")
          assert.property(res.body, '_id')
          idTestThread = res.body._id
          delPwdTestThread = res.body.delete_password
          done()  
        })
      })
      
      test('Posting thread#2', done => {
        chai.request(server)
        .post('/api/threads/testboard')
        .send({text: "text to test thread 2", delete_password: "del" })
        .end((err, res) => { 
          assert.equal(res.status, 200, 'Status OK')
          idTestThread2 = res.body._id
          done()  
        })
      })
      
    })
    
    suite('GET', function() {
      //I can GET an array of the most recent 10 bumped threads on the board with only the most recent
      //3 replies from /api/threads/{board}. The reported and delete_passwords fields will not be sent.
    test('get threads from a given board', done => {
        chai.request(server)
        .get('/api/threads/testboard')
        .end((err, res) => { 
          assert.equal(res.status, 200, 'Status OK')
          assert.isArray(res.body)
          assert.isTrue(res.body.length <= 10)
          for (let i=0; i< res.body.length; i++) {
            assert.equal(res.body[i].delete_password, "")
            assert.isBoolean(res.body[i].reported) 
            assert.equal(res.body[i].reported, false)
            assert.isTrue(res.body[i].replies.length <3)
          }
          done() 
        })
      })    
      
    });
    
    suite('DELETE', function() {
      //I can delete a thread completely if I send a DELETE request to /api/threads/{board} and pass 
      //along the thread_id & delete_password. (Text response will be 'incorrect password' or 'success')
      
      test('trying to delete thread with wrong password ', done => {
        chai.request(server)
          .delete('/api/threads/testboard')
          .send({thread_id: idTestThread, delete_password: "nonono"})
          .end((err, res) => {
            assert.equal(res.status, 200, 'Status OK')
            assert.equal(res.body,"incorrect password") 
            done()   
          })  
      })
      
      test('delete thread with good password ', done => {
        chai.request(server)
          .delete('/api/threads/testboard')
          .send({thread_id: idTestThread, delete_password: delPwdTestThread})
          .end((err, res) => { 
            assert.equal(res.status, 200, 'Status OK')
            assert.equal(res.body,"success")
            done()   
          })
      })
      
    });
    
    suite('PUT', function() {
      //I can report a thread and change it's reported value to true by sending a PUT request 
      //to /api/threads/{board} and pass along the thread_id. (Text response will be 'success')
      
      test('report a thread with PUT request', done => {
        chai.request(server)
          .put('/api/threads/testboard')
          .send({thread_id: idTestThread2})
          .end((err, res) => { 
            assert.equal(res.status, 200, 'Status OK')
            assert.equal(res.body,"success")
            done()
          })
      })
      
    });
    

  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      //I can POST a reply to a thead on a specific board by passing form data text, delete_password, 
      //& thread_id to /api/replies/{board} and it will also update the bumped_on date to the comments 
      //date.(Recomend res.redirect to thread page /b/{board}/{thread_id}) In the thread's 'replies' array 
      //will be saved _id, text, created_on, delete_password, & reported.

    });
    
    suite('GET', function() {
      

    });
    
    suite('PUT', function() {
           

    });
    
    suite('DELETE', function() {
             

    });
    
  });

});
