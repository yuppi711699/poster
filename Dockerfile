FROM node:18  
#скачали ноду с докер хаба
WORKDIR /usr/src/app
#переходим в эту деректорию
#https://nodejs.org/ru/docs/guides/nodejs-docker-webapp/
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./
# копируем все файлики package с расширением json в текущюю директорию

RUN npm install
# Если вы создаете сборку для продакшн

# копируем исходный код
COPY . .
#определяем порт для ноды
#RUN npm run demo-build
EXPOSE 3080
#запуск внутри докера
CMD [ "npm", "run", "start"]
# "src/index.js" ]
# CMD ["node", "src/example/example.js"]