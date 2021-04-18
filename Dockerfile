FROM node:12

ENV NODE_ENV=production

WORKDIR /app

COPY art-aws-sdk       art-aws-sdk
COPY backend           backend
COPY frontend          frontend
COPY package.json      package.json
COPY package-lock.json package-lock.json
COPY LICENSE           LICENSE

RUN npm install --loglevel verbose
RUN cd backend && npm install --loglevel verbose
RUN cd frontend && npm install --loglevel verbose
RUN npm run build

EXPOSE 1337
EXPOSE 3000

CMD [ "npm", "run", "production" ]