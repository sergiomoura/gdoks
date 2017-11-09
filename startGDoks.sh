#!/bin/bash

# Comando que cria e roda o container
# docker run --name gdoks-container -d -p 80:8080 -v $PWD/www:/usr/share/nginx/www -v $PWD/includes:/usr/share/nginx/includes -v $PWD/client_data:/usr/share/nginx/client_data gdoks-image:1.4

#Comando que inicia o container já existente
docker start gdoks-container