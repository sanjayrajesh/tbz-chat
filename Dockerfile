FROM gradle:jdk11 as gradle-build
RUN mkdir -p /opt/backend
COPY --chown=gradle:gradle tbz-chat-backend /opt/backend
WORKDIR /opt/backend
RUN gradle bootJar

FROM node:alpine as node-build
RUN mkdir -p /opt/frontend
WORKDIR /opt/frontend
COPY tbz-chat-frontend/public ./public
COPY tbz-chat-frontend/src ./src
COPY tbz-chat-frontend/.eslintrc.json ./
COPY tbz-chat-frontend/package.json ./
COPY tbz-chat-frontend/tsconfig.json ./
RUN yarn install --no-progress
RUN yarn build

FROM nginx
RUN mkdir -p /usr/share/man/man1
RUN apt update && apt install -y default-jdk
RUN java -version
RUN javac -version
COPY tbz-chat-frontend/.env /var/opt/.env
COPY ConfigureEnv.java /var/opt/ConfigureEnv.java
COPY configure-env.sh /docker-entrypoint.d/01-configure-env.sh
COPY run-backend.sh /docker-entrypoint.d/02-run-backend.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN ls -l /var/opt
COPY --from=node-build /opt/frontend/build /usr/share/nginx/html
COPY --from=gradle-build /opt/backend/build/libs/*.jar /var/opt/backend.jar
EXPOSE 80