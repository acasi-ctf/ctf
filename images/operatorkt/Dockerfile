FROM openjdk:11-jdk-buster AS builder
WORKDIR /src

COPY operator/gradlew /src
COPY operator/gradle /src/gradle

RUN ./gradlew tasks --no-daemon; exit 0

COPY operator/ /src

RUN ./gradlew distZip --no-daemon

FROM openjdk:11-jre-buster

WORKDIR /app

COPY --from=builder /src/build/distributions/operator-1.0-SNAPSHOT.zip /app
RUN unzip /app/operator-1.0-SNAPSHOT.zip
RUN mv operator-1.0-SNAPSHOT/* .
RUN rm -r operator-1.0-SNAPSHOT*

RUN chmod +x /app/bin/operator

CMD ["/app/bin/operator"]
