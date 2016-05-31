autoscaler-service-broker
=====

AutoScaler service broker is built by nodejs/expressjs

---
**Local dependencies**
```sh
npm install
```
**Service broker configuration**
Change configuration for service broker in file `config/settings.json`

**Start your server using nodemon**
```js
npm run start
```
Access with `http://localhost:8080/v2/catalog`

**Run unit test**
```js
npm run runUT
```

**Run RESTful API function test**
```js
npm run runFAT
```
Note: please ctrl+C to exit when finished, and kill the backend "node index.js" process by 
```sh
ps -ef | grep -v "grep" | grep node | awk '{print $2}' | xargs -I {}  kill -9 {}
```

