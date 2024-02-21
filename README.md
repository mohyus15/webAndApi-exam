

1: npm install for the først gange last ned i projekten i root av projekten.
2: npm run dev, for kjøre helle projekten både socket backend og frontend.
3: npm run deploy ,den brukker du når du skal deploy for eksamepel http://localhost:8080/ 
Dette prosjektet består av flere avhengigheter, og de er alle oppført her både for frontend og backend:
backend:
    bcryptjs
    body-parser
    cookie-parser
    cors
    dotenv
    express
    jsonwebtoken
    mongoose
    morgan
    socket.io

frontend:
    bootstrap
    react
    react-bootstrap
    react-dom
    react-icons
    react-input-emoji
    react-router-dom
    socket.io-client
    timeago.js
    react-contex-api
Socket:
   nodemon,
   socket.io


Adminbrukere kan se admin-dashboardet, opprette users, se alle brukere, slette og oppdatere brukere.
Hvis du vil se noen av brukerne som er administratorer, kan du gå til backend src/seedData/users og src/seedData/news for se for hvordan jeg har laget.


disse er brukker some er admin
1:
  name: admin
  password: 123456
 
2: 
  name: sensur
  password: 123456
3:
  name: Bogdan
  password: 123456
brukken kan også login med Google for å se lese hele artikkelen,og brukken can see profilen sin.

docker:

Denne Dockerfile setter opp et Docker-bilde som inneholder en Node.js-applikasjon med både frontend- og backend-delen. Den bygger på et lettvektsmiljø (Alpine Linux) og installerer avhengigheter for både frontend og backend. Etter å ha kopiert kildekoden, bygger den frontend-delen av applikasjonen. Til slutt konfigurerer den oppstartskommandoen for å kjøre serveren, og eksponerer port 8080.


Render:
 jeg har prøvde å deploy til Heroko, men den koster penger, jeg tenkte å deploy til Render, jeg hadde problem med sette mongoDb url, og deform, vil jeg ikke se list med nyher artikkelene.
 detter er url til min netside
 


 bilder av netsiden
 FØRST SIDEN




hvis kunden lage logget inn  can bruken kan lese hele artikkelen.



admin kan snakke med alle some registred i den netsiden og kunden can chatte med admin brukker begge brukker socket.io some bilden viser 










github action for my code;
https://github.com/mohyus15/webAndApi-exam/actions.










