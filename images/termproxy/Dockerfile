FROM golang:1.16.0-buster AS builder
WORKDIR /src

ADD . /src

RUN go mod download

RUN go build -o /out/termproxy /src/cmd/termproxy/main.go

FROM debian:buster

COPY --from=builder /out/termproxy /app/termproxy
WORKDIR /app

ENTRYPOINT ["/app/termproxy"]
