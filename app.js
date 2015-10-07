/* Nodebot Controller*/
//Be sure to use node version 0.10.36
//to match the verson of node being run
//on the raspberry pi

var socket = require('socket.io-client')('http://10.0.1.5:8080');
var XboxController = require('xbox-controller');
var xbox = new XboxController;

/*
 * Must wait for server to connect
 * Could move event handlers to separate class
 * Should implement the rest of the controller (IDK why tho)
 * 
 */
 socket.on("connect", function() {
    console.log("Controller Connected!");

    /*
     * Move car forward
     * position must be postive
     * position range 0-255
     */
    xbox.on('righttrigger', function(position){
        console.log('righttrigger', position);
        socket.emit("motorA", {position: position});
    });

    /*
     * Move car backwards
     * position must be negative
     *
     */
    xbox.on('lefttrigger', function(position){
        console.log('lefttrigger', position);
        socket.emit("motorA", {position: -position});
    });

    /*
     * Left Analog Stick
     * Controls the wheels
     * currently just sends raw position data
     */

    xbox.on('left:move', function(position){
        console.log('left:move', position);
        socket.emit("left", position);
    });
 });

/*
 * App currently fails if user is disconnected
 * should attempt to reconnect if disconnected
 * 
 *
 */
