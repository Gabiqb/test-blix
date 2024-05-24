FROM node:latest  
WORKDIR /server

COPY package.json .
RUN npm i 
COPY . .

EXPOSE 3001

CMD ["npm","start"]