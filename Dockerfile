FROM tomcat
COPY . /usr/local/tomcat/webapps/ROOT
RUN rm /usr/local/tomcat/webapps/ROOT/Dockerfile
COPY libs/*.war /usr/local/tomcat/webapps/api.war
EXPOSE 8080