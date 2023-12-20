FROM node:20

WORKDIR /app

COPY package.* ./

RUN npm install

COPY . .

EXPOSE 8090

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

# Set the command to wait for the MongoDB container and then start the application
CMD /wait &&npm run dev