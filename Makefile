PROTOSRC = proto/common proto/termproxy proto/ctfoperator
IMAGETAG = latest

all: $(PROTOSRC)

$(PROTOSRC): %:%.proto
	protoc --go_out=proto/ --go_opt=paths=source_relative --go-grpc_out=proto/ --go-grpc_opt=paths=source_relative -I proto/ $<

docker_penimage:
	docker build -t ghcr.io/lgorence/goctfprototype/penimage:$(IMAGETAG) images/penimage
	docker push ghcr.io/lgorence/goctfprototype/penimage:$(IMAGETAG)

docker_termproxy:
	docker build -t ghcr.io/lgorence/goctfprototype/termproxy:$(IMAGETAG) -f images/termproxy/Dockerfile .
	docker push ghcr.io/lgorence/goctfprototype/termproxy:$(IMAGETAG)
