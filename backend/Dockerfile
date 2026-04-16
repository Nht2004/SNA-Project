# base image with Node.js
FROM node:18            

# set working directory
WORKDIR /app            

# copy dependency files
COPY package*.json ./   

# install dependencies
RUN npm install         

# copy source code
COPY . .                

# declare app port
EXPOSE 3000             

# start the app
CMD ["node", "server.js"]  

