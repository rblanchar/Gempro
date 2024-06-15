FROM node:20-alpine3.19
WORKDIR /Backend
COPY Moldels /Backend/Moldels
COPY Routes /Backend/Routes
COPY services /Backend/services
COPY package.json /Backend/package.json
EXPOSE 3000
RUN npm install
CMD ["node", "index.js"]