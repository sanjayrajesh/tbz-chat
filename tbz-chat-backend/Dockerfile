FROM gradle:jdk11 as gradle-build
RUN mkdir -p /opt/backend
COPY --chown=gradle:gradle tbz-chat-backend /opt/backend
WORKDIR /opt/backend
RUN gradle bootJar

FROM openjdk:11
COPY --from=gradle-build /opt/backend/build/libs/*.jar ./app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]