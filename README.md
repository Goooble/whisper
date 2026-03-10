# whisper

## TODO

Need API layer on the front end to handle reroutes if logged out along the way

fix naming schemes and comment code

Need to validate payloads
please fix up a naming scheme before it gets too big
error handling everywhere

Checkout status codes

## Lessons

When you need to change a variable using two states, just make a normal variable that decides between taking the values of two states, remember how you coded up the selecting user for DM

### Data flow

#### Server

WS->auth>db
WS->chatService(return instructions)
so even chat acts as an API for WS

point being, keep WS dumb, decisions in Chat

#### FrontEnd

APP -> state manager and holds connection
WS -> events -> APP through a reducer to update state
APP->sends data to server -> functions in WS
