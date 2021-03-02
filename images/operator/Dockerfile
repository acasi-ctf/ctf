# Build image
FROM golang:1.16.0-buster AS builder
WORKDIR /src

# These three steps will speed up Docker builds, as if the go.mod and go.sum
#  do not change after the first build, it will cache that layer and use it
#  for every build until they do change.
COPY go.mod .
COPY go.sum .
RUN go mod download

# Now, build the actual application.
COPY . .
RUN go build -o /out/operator /src/cmd/ctfoperator/main.go

# Application image
FROM debian:buster

COPY --from=builder /out/operator /app/operator
WORKDIR /app

ENTRYPOINT ["/app/operator"]
