FROM node:14-alpine 
#скачали ноду с докер хаба
WORKDIR /app
#переходим в эту деректорию
#https://nodejs.org/ru/docs/guides/nodejs-docker-webapp/
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./
COPY package-lock.json ./
# копируем все файлики package с расширением json в текущюю директорию

RUN npm install
# Если вы создаете сборку для продакшн

# копируем исходный код
COPY . .
#определяем порт для ноды
#RUN npm run demo-build
EXPOSE 3000
#запуск внутри докера
CMD [ "npm", "start"]
# "src/index.js" ]
# CMD ["node", "src/example/example.js"]