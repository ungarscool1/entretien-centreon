# Entretien Centreon

This application is a client/server chat as purpose to communicate around the world.

The server and client are in NodeJS. The packet transfer is in JSON over websocket powered by [socket.io](https://socket.io/).

## How to install

### Dependencies

You will need to install [NodeJS](https://nodejs.org/en/download/) and [npm](https://npmjs.com).

#### You need help to install NodeJS with package manager ?

Check [this page](https://nodejs.org/en/download/package-manager) to know how to install NodeJS.

### Install

The project is separated in two parts:
- The client
- The server

#### Client

To install all project dependencies, you need to go to the client folder and run the command: ``npm install``

#### Server

To install all project dependencies, you need to go to the server directory and run the following command: ``npm install``

## How to start

### Client

To start the client, you need to go to the client folder and run the command: ``node index.js <ip> <port>``

### Server

To start the server, you need to go to the server folder and run the command: ``node index.js <port>``