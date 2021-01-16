# openindoor-app

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

#### Build and run With docker
```
docker-compose up --build
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Run applicatiioin as
http://localhost:8080/landing/thailand/100.55532/13.98083/17/51/60/0/0        

Description  : /landing/:country/:long/:lat/:zoom/:bearing/:pitch/:floor/:building

## Validation

### Hot reload

```
docker-compose run openindoor-app yarn serve --port 80
```

### Code checker

```
docker-compose run openindoor-app yarn lint
```

### Behing caddyser

```
docker-compose up --build openindoor-app
```

### Old url format support

http://localhost:62596/oldurl/thailand#map=17/100.55532/13.98083/51/60/0/0

Description  : /oldurl/:country#map=:zoom/:lon/:lat/:bearing/:pitch/:floor
