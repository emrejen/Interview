# Interview
## Introduction

Basic application for a front-end interview.
For this exercise, we ask that you create a front-end Chat application. Below you will find the API calls that you need to implement. 
You are the Product; you are the designer - so as you want.
Create a front-end application in whatever technology that you feel comfortable with.

We would like to see:
* all the current messages in the system
* the list of online users
* a place to type your own message (you are one of the online users - select one to be you)

## API
You will need to implement the following API calls

`GET /users` - to view a list of users

`GET /messages` - to view a list of messages

`POST /messages/:userId/:message` - to post a new message

`DELETE /clear` - to clear all messages


You can either clone the project and do it locally, or direct your API calls to https://pacific-taiga-76065.herokuapp.com/

In order to make each request valid, you will need to add a special header `x-authentication-token` with this very secret value `very-secrete-token`.

### You will be judged on:
* Clean code
* Modularity
* Architecture
* Tests (a big plus)

Write code that you can defend - write code that you are proud of.

