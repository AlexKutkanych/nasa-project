FROM node:lts-alpine

WORKDIR /app

# copy file from . - root folder (nasa-project) to . - root of Docker image 
COPY package*.json ./
COPY client/package*.json client/
RUN npm run install-client --omit=dev

COPY server/package*.json server/
RUN npm run install-server --omit=dev

# build frontend
COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

# run when container is started
CMD ["npm", "start", "--prefix", "server"]
# port for backend
EXPOSE 8000