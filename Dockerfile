FROM node:20

WORKDIR /app

COPY package.* ./

RUN npm install

COPY . .

EXPOSE 4444

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

CMD /wait && npm run dev