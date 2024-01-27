FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444

CMD ["sh", "-c", "echo 'MongoDB IP Address: $(getent hosts mongo | awk ''{print $1}'')' && npm run dev"]
