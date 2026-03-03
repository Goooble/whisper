## Whisper

To be honest, I have no idea where I am going with this project, I just want to build a messenger which is close to production grade, in the sense of scale so I learn the typical backend ecosystem. Performance, testing(major), scaling and so on.
Will it actually be any useful for anything at all? I dont know, will I learn a lot? yes. Hopefully, I land upon a good idea eventually on what to do with this. But for now, I want to learn everything I can, first with a terminal program because its cool.

## Typescript

I have spent half a day reading up on typescript from their docs, and i got tired after the point where i realized most of it I would probably never use. It was really fun learning, I understand the basics of TS and I cant wait to implement it

## Websockets

I read through some theory, set up basic client architecture, actually i dont even know why i am investing so much in the client because I eventually want to move onto a webpage with the same server.

## Moving to web client

Alright, making a terminal app seems like too much work without a library, its not something I would like to waste my time on if its gonna take me so much time. I will just move it to react, I can always make one eventually with the same server anyways.

## Server architecture

I am at the point where I kind of understand how websockets and the overall server blend together. You have two servers running on the same port, i can make calls to the websocket using socket with JSON and I can also make calls to my express server normally. Now I really need to start thinking about how I am going to structure my server really otherwise its going to lead to a huge refactor. The biggest mistake is probably not having a good idea of how JWT auth would work so abstracting that away is a leading to a lot of confusion. DB I have a general idea of how that is going to work so thats alright.

I am not super interested in implementing auth and db right now, so i will just try to abstract away whatever ID verification stuff I have to the best of my ability.

## FrontEnd Architecture

Recieveing data from teh server and updating state was a huge mess. So after some thinking and help form AI to structure this stuff. Heres what I have in mind: I am gonna have a reducer in teh app, that manages all state related to the chat data. And the dispatcher is sent to the websocket handler, while initiating a socket.
This dispatcher is getting mapped to the corresponding data beign recieved. this was to ensure that i can easily update the mapper to refelct changes in server api or dispatcher functions

So this is how recieving would work, state is only handled by APP, or react, WS file only hanldes validation of data an caling the dispatcher. all i have to do is add more functions dispatcher can handle according to the server.

Sending, i have to keep a referennce of the socket in teh APP anyway, so i am just gonna define functions in WS file, that i can call and pass socket through. Just to keep socket.send() calls in transport layer

the UI will make no socket calls, it will just use the callback i am gonna pass into the components through the APP which inturn would call WS functions.

I have realized, teh way to know about what should go where, component A or component B. Imagine, you remove component B and replace with component C. how much do you have to refactor? and imagine the opposite scenario. Keep doing this process for every decision and find ways to reduce this refactoring, this reallllyyyy helps. earlier you make such decisions, the better teh dev experience. THis will tell what should own and handle what.

## WebSocket server data flow

after some thinking and back and forth with AI. I painstakingly implemented the FrontEnd data -> WS -> Chat service data flow. Chat service sending back instruction to WS for execution seems like a lot of overhead to me but it makes sense how it reduces coupling A LOT between WS and ChatService and how all I have to do right now is just attaching functions to the data flow framework I have built up both in the frontEnd and the Backend. Also had a run in with a debugger, and damn debuggers are pretty cool rather than pasting console.logs everywhere to figure out where teh error is.

## The power of typescript

I am impressed, really impressed and SO GLAD that I learnt typescript for this like so so so glad. So many objects moving around everywhere, without types, it would have been hell debugging this nonsense. I love typescript, and I am gonna swear by it from today. Need to use it for the front end also from next time, I promise.

## Connecto pivot

I have an idea now, I brainstormed for few hours and I want to pivot this in that direction. Hope its impressive on a resume.

<!-- Please add comments and Error validation before commits -->
