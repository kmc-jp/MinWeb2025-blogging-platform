FROM node:20-alpine

WORKDIR /nextjs

COPY . .

RUN yarn install
RUN yarn run build

CMD ["yarn", "start"]