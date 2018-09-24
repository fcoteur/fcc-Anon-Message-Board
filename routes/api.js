/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var Thread = require('../models/thread');
var Reply = require('../models/reply');

var expect = require('chai').expect;

module.exports = function (app) {
  
  app.route('/api/threads/:board')
  
    .get(function (req, res) {
      //I can GET an array of the most recent 10 bumped threads on the board with only the most 
      //recent 3 replies from /api/threads/{board}. The reported and delete_passwords fields will not be sent.
    // missing to filer out the replies
      let board = req.params.board;
    
      Thread.find({board: board},{},{sort: {created_on:-1}, limit: 10},(err,data) =>{
        if (err) console.log(err);
        res.send(data)
      })
    

      
    })

    .post(function (req, res) {
      //I can POST a thread to a specific message board by passing form data text and delete_password 
      //to /api/threads/{board}.(Recomend res.redirect to board page /b/{board}) 
      // Saved will be _id, text, created_on(date&time), bumped_on(date&time, starts same as created_on), reported(boolean), delete_password, & replies(array).
      let thread = new Thread ({
        board: req.body.board, 
        text: req.body.text,
        delete_password: req.body.delete_password,
      });
      thread.save((err) => {if (err) console.log(err)});
      res.redirect('/b/'+req.body.board)
    })
    
    .delete(function (req, res) {
      //I can delete a thread completely if I send a DELETE request to /api/threads/{board} and pass along 
      //the thread_id & delete_password. (Text response will be 'incorrect password' or 'success')

      res.send()
    })

    .put(function (req, res) {
      //I can report a thread and change it's reported value to true by sending a PUT request 
      //to /api/threads/{board} and pass along the thread_id. (Text response will be 'success')

      res.send()
    })
  
  app.route('/api/replies/:board')
  
    .get(function (req, res) {
      //I can GET an entire thread with all it's replies from /api/replies/{board}?thread_id={thread_id}. 
      //Also hiding the same fields.
      let board = req.params.board;

      res.send(board)
    })

    .post(function (req, res) {
      //I can POST a reply to a thead on a specific board by passing form data text, delete_password, 
      // & thread_id to /api/replies/{board} and it will also update the bumped_on date to the comments 
      //date.(Recomend res.redirect to thread page /b/{board}/{thread_id}) In the thread's 'replies' array 
      //will be saved _id, text, created_on, delete_password, & reported.

      res.send()
    })
    
    .delete(function (req, res) {
      //I can delete a post(just changing the text to '[deleted]') if I send a DELETE request 
      //to /api/replies/{board} and pass along the thread_id, reply_id, & delete_password. 
      //(Text response will be 'incorrect password' or 'success')

      res.send()
    })
  
    .put(function (req, res) {
      //I can report a reply and change it's reported value to true by sending a 
      //PUT request to /api/replies/{board} and pass along the thread_id & reply_id. 
      //(Text response will be 'success')

      res.send()
    })

};
