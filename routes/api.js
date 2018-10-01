/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var Thread = require('../models/thread');

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
      let thread_id = req.body.thread_id;
      let delete_password = req.body.delete_password;      
      Thread.findOneAndDelete({_id: thread_id, delete_password: delete_password },(err,data) => {
        if (err) console.log(err);
        if (data) {
          res.send("success"); 
        } else {
          res.send("incorrect password");
        }     
      })
    })

    .put(function (req, res) {
      let thread_id = req.body.thread_id;     
      console.log(thread_id)
      Thread.findOne({_id: thread_id},(err,data) => {
        if (err) console.log(err);
        data.reported = true
        data.save((err) => {if (err) console.log(err)});
      })
    })
  
  app.route('/api/replies/:board')
  
    .get(function (req, res) {
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
      let thread_id = req.body.thread_id;
      let reply_id = req.body.reply_id;
      let delete_password = req.body.delete_password;
      Thread.findOne({_id: thread_id},(err,data) =>{
        if (err) console.log(err);
        for (let i=0;i<data.replies.length;i++) {
          if (data.replies[i]._id == reply_id) {
            if (data.replies[i].delete_password == delete_password) {
              data.replies[i].text = "deleted";
              data.save((err) => {if (err) console.log(err)});
              res.send("success"); 
            } else {
              res.send("incorrect password");
            }
          }
        }
      })
  })
  
    .put(function (req, res) {
      let thread_id = req.body.thread_id;  
      let reply_id = req.body.reply_id;
      Thread.findOne({_id: thread_id},(err,data) =>{
        if (err) console.log(err);
        for (let i=0;i<data.replies.length;i++) {
          if (data.replies[i]._id == reply_id) {
            data.replies[i].reported = true;
            data.save((err) => {if (err) console.log(err)});
            res.send("success"); 
            console.log(data)
          }
        }
      })
    })

};
