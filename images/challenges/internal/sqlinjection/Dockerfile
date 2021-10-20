FROM golang:1.16-buster AS builder
WORKDIR /src

COPY challenges/internal/challenges/sqlinjection/code/ /src

RUN go mod download
RUN go build -o main main.go

FROM debian:buster

COPY --from=builder /src/main /app/main

ENTRYPOINT ["/app/main"]
