#Docker file for and angular project
# Base image
FROM node:10
# Maintainer name
LABEL maintainer="amar@amar.io"
# Copying angular folder from local directory to Educative directory
COPY angular /usr/local/educative/angular
# Installing Angular cli and node modules in angular directory
RUN     npm install -g @angular/cli &&\
        cd /usr/local/educative/angular &&\
        npm i
        RUN ng build –prod
EXPOSE 3000

