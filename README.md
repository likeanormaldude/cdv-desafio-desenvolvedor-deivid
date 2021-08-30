# CDV Test Deivid Rodrigues

![GitHub all releases](https://img.shields.io/github/downloads/likeanormaldude/cdv-desafio-desenvolvedor-deivid/total?color=%2300f&label=Downloads&logo=GitHub) ![GitHub repo size](https://img.shields.io/github/repo-size/likeanormaldude/cdv-desafio-desenvolvedor-deivid?color=%23657b99)

[![Linkedin Profile](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/rodriguesdeivid15)

App built with ReactJS, having a local API (_./api_) to get the request and parse the local DB `./api/COTAHIST_M012021.TXT`
With "Código de negociação do papel" and "Data do pregão", the API will search for the most update "Preço do Último negócio do papel-mercado" for the given date

![alt text](https://i.imgur.com/jl1RjyN.png)

## Installation

```sh
# First make sure you have redis-server running on your machine and its port is available.
npm install
npm run app
```

The script "app" on package json will run the following commands:

```sh
# Concurrently is a package that allows us to run both the local API and the interface built with ReactJS
concurrently --kill-others \"npm run start-react-app\" \"npm run start-api-nodemon\"
```

## API Test

To individually teste the API there's the npm script **start-api**. The one and only route is `/fetch`.
Request Example: http://localhost:4500/fetch?codPapel=PETR3&dataPreg=19%2F01%2F2021 .
Note that both HOST and PORT can be set using `.env` file:
![alt text](https://i.imgur.com/gjPKqiu.png)
![alt text](https://i.imgur.com/hb07F22.png)

## Clear Cache

```sh
# Once redis-server is running, open another terminal and run:
redis-cli FLUSHALL
```

## Project Main Comments

The comments about the creation process and other details can be found at `./src/App.js`
