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
