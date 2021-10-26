# Sockets

Status of this Memo:

This memo is the official specification of the protocol.

## 1. Introduction

The objective of the protocol is to provide a simple, reliable, and efficient way to speak between people around the world.

In this project, we use [socket.io](https://socket.io/) to implement the protocol.

## 2. Overview

### 2.1. The communication model

              ----------                     -------------
              |/------\|    User commands    |/----V----\|
              ||Server|<----------------------|   User  ||
              ||      ||                     ||  CLIENT ||
              |\--^---/--------------------->|\----^----/|
              ----------   Server response  -------------
                Server                            USER

In the model described upper, the Client initiates the websocket. The connection protocol follow a json protocol. Replies are sent from the server process to the User Client process over the connection control in response to the command previously sent.

## 3. Functions

The communication channel from the client to the server process is established as a websocket connection from the user to the server port.

### 3.1 Commands

              ------------------
              |  Message body  |
              ------------------
                       |
                       |  Send the message to the server
                       V
              -------------------
              |  Response body  |
              -------------------

The response body can be optionnal following the context.

#### 3.1.1 Commands events

|         Event type      |                             Purpose                            |
| ----------------------- |:--------------------------------------------------------------:|
|         message         |                   To send or receive message                   |
|       disconnect        |       In case if you lose the connection with the server       |
|         register        |                     To register your client                    |

#### 3.1.2 Message events

This event is used to send a message to the server and receive messages from others.

You receive message event when someone has been registered in the room or logged out but the sender is `Server`.

##### Send message

The send message has the following structure in json:
- `from`: The sender username
- `message`: The message to send

If the from field is not correct, the server will correct it.

##### Receive message

When you receive a message, the server will send you a message event with the following structure in json:
- `from`: The sender username
- `message`: The message to send

#### 3.1.3 Disconnect events

This event is used when you lost the connection with the server and it will be triggered only by the socket itself.

##### Server side

When the server receives a disconnect event, it will send a message event to all the clients in the room from `Server` user and `your-username left the chat` message.

#### 3.1.4 Register events

This event is used to register your client in the server and to announce the presence of the user in the room.

Each user has a unique username, the username is used to display the message sender.

When you register your client, you will send to the server a register event with raw username.

Each request to register a client must be followed by a response with a boolean value. True if the registration is successful, false otherwise. However, if the registation is successful, the server will send to every user in the room a message event from `Server` user and `your-username has joined the chat` message.