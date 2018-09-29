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
      let board = req.params.board;  
      Thread.find({board: board},{},{sort: {created_on:-1}, limit: 10},(err,data) =>{
        if (err) console.log(err);
        for (let i=0; i<data.length;i++){
          if (data[i].replies.length > 3) data[i].replies = data[i].replies.slice(-3);
          data[i].reported =""; 
          data[i].delete_password=""; 
          for (let j=0; j<data[i].replies.length;j++){
            data[i].replies[j].reported =""; 
            data[i].replies[j].delete_password=""; 
          }
        }
        res.send(data)
      })
      
    })

    .post(function (req, res) {
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
      let thread_id = req.query.thread_id;
      
      Thread.findOne({_id: thread_id},(err,data) =>{
        if (err) console.log(err);
        data.reported =""; 
        data.delete_password=""; 
        res.send(data)
      })
    })

    .post(function (req, res) {    
      let thread_id = req.body.thread_id;
      let newReply = {
        text: req.body.text,
        delete_password: req.body. delete_password
      };  
      Thread.findOne({_id: thread_id},(err,data) =>{
        if (err) console.log(err);
        data.replies.push(newReply);
        data.bumped_on = Date.now();
        data.save((err) => {if (err) console.log(err)});
        res.redirect('/b/'+data.board+"/"+thread_id)
      })
    })
    
    .delete(function (req, res) {
      //I can delete a post(just changing the text to '[deleted]') if I send a DELETE request 
      //to /api/replies/{board} and pass along the thread_id, reply_id, & delete_password. 
      //(Text response will be 'incorrect password' or 'success')
      let thread_id = req.body.thread_id;
      let reply_id = req.body.reply_id;
      let delete_password = req.body.delete_password;
      
      Thread.findOne({_id: thread_id},(err,data) =>{
        if (err) console.log(err);
        
        for (let i=0;i<data.replies.length;i++) {
          console.log(data.replies[i])
          if (data.replies[i]._id === reply_id) {
            if (data.delete_password === delete_password) {
              data.replies[i].text = "deleted";
              res.send("success");
            } else {
              res.send("incorrect password");
            }
          }
        }
      res.send("not ok!")
    })
  })
  
    .put(function (req, res) {
      //I can report a reply and change it's reported value to true by sending a 
      //PUT request to /api/replies/{board} and pass along the thread_id & reply_id. 
      //(Text response will be 'success')

      res.send()
    })

};
