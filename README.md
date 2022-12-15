<p align="center" >
   <img src=".github/logo.png" alt="logo" height="360px"/>
</p>

# Waiter App

#### :postbox: About

- Waiter app created on js stack week

#### :pushpin: Prototype

- [Figma](<https://www.figma.com/file/VmmYachnQfBjYzEh8BDp6W/WAITERAPP-(Copy)?node-id=11%3A195&t=dGB1KTEFpV8FzHYN-0>)

#### :rocket: User Stack

#### Server

- [Express](https://expressjs.com/pt-br/guide/routing.html)

##### 🤷 How Running ?

1- Run Docker and Server

```
# open server folder
cd server

# select node version
nvm use

# run docker
sudo docker-compose up

# install dependecies
yarn

# run server
yarn dev
```

2 - Run Dashboard

```
# open web folder
cd web

# create .env file and fill the variable with server url
VITE_API_URL = <ServerUrl>

# select node version
nvm use

# install dependecies
yarn

# build project
yarn build

# install local server
npm i -g serve

# run dist
yarn start

```

#### 📱 Preview Mobile

<p align="center">
<video src='https://user-images.githubusercontent.com/38052474/205186168-f260f061-ae7c-4fdf-a7e6-346f0a9257c6.mp4' width=180/> 
</p>

#### 📱 Preview Dashboard

<p align="center">
<video src='https://user-images.githubusercontent.com/38052474/207961083-35735485-f90c-41e2-ae45-6e390711579c.mp4' width=180/> 
</p>




