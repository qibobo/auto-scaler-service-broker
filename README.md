autoscaler-service-broker
=====

AutoScaler service broker is built by nodejs/expressjs

---
**Local dependencies**
```sh
npm bootstrap
```
**Service broker configuration**
Change configuration for service broker in file `config/settings.json`

**Run eslint**
```js
npm run lint
```
**Run unit test**
```js
npm run test
```

**Start your server using nodemon**
```js
npm run start
```
Access with `http://localhost:8080/v2/catalog`

**Run RESTful API function test**
When the server is running, you can execute RESTful API function test in another terminal. 
```js
npm run test
```
