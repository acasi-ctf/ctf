# Build image
FROM golang:1.16.0-buster AS builder
WORKDIR /src

COPY . /src

RUN go mod download

RUN go build -o /out/operator /src/cmd/ctfoperator/main.go

# Application image
FROM debian:buster

COPY --from=builder /out/operator /app/operator
WORKDIR /app

ENTRYPOINT ["/app/operator"]
