FROM node:latest

ENV APP_ROOT /app

RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

COPY . /app/

RUN npm i
	
EXPOSE 3000

CMD ["npm", "start"]