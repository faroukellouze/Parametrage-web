FROM java:8
VOLUME /tmp
ADD WEB-INF /WEB-INF
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Dspring.profiles.active=prod","-jar","/WEB-INF/parametrage-web-0.0.1-SNAPSHOT.jar"]
