FROM gradle:jdk11 as gradle-build
RUN mkdir -p /opt/backend
COPY --chown=gradle:gradle tbz-chat-backend /opt/backend
WORKDIR /opt/backend
RUN gradle build

FROM node:alpine as node-build
RUN mkdir -p /opt/frontend
ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
WORKDIR /opt/frontend
COPY tbz-chat-frontend/public ./public
COPY tbz-chat-frontend/src ./src
COPY tbz-chat-frontend/.eslintrc.json ./
COPY tbz-chat-frontend/configure-env.js ./
COPY tbz-chat-frontend/.env ./
COPY tbz-chat-frontend/package.json ./
COPY tbz-chat-frontend/tsconfig.json ./
RUN node configure-env.js
RUN yarn install --no-progress
RUN yarn build

FROM tomcat
COPY --from=node-build /opt/frontend/build /usr/local/tomcat/webapps/ROOT
COPY --from=gradle-build /opt/backend/build/libs/*.war /usr/local/tomcat/webapps/api.war
EXPOSE 8080