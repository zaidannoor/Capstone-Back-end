FROM node:16.16.0-alpine
# RUN apk add --no-cache g++ make python

WORKDIR /capstone
# COPY app.js package.json /docker-express/
COPY . ./
RUN npm install bcrypt
RUN npm install
# RUN npm install


CMD ["npm", "run", "start"]

EXPOSE 3005