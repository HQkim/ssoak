FROM openjdk:8-jdk-alpine
ARG JAR_FILE=/build/libs/ssoak-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} ssoak.jar
ENTRYPOINT ["java","-jar","/ssoak.jar"]