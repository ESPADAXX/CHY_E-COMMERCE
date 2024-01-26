FROM node:20

WORKDIR /app

COPY package.* ./

RUN npm install

COPY . .

EXPOSE 4444

# Set the command to wait for the MongoDB container and then start the application
CMD npm run dev