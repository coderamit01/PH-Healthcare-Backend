FROM  node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare npm@11.6.1 --activate

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .

EXPOSE 5000
CMD [ "sh", "-lc", "CI=true npm install && npm generate && npm dev" ]