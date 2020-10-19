FROM node:12-alpine

RUN mkdir -p /code

WORKDIR /code

ADD . /code

RUN yarn

CMD [ "yarn", "start" ]

EXPOSE 3000
