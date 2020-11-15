#Docker file for and angular project
# Base image
FROM node:10
# Maintainer name
LABEL maintainer="nadinegadjou@gmail.com"
# Copying angular folder from local directory to Educative directory
COPY angular /home/ubuntu
# Installing Angular cli and node modules in angular directory
RUN     npm install -g @angular/cli &&\
        cd /home/ubuntu/testdocker &&\
        npm i
        RUN ng build –prod
EXPOSE 3000

