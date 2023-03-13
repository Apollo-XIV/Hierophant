FROM node:19-alpine
WORKDIR /usr/src/app/
COPY package*.json /usr/src/app/
RUN npm ci
COPY . /usr/src/app/
COPY prisma ./prisma/
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]