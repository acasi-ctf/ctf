PROTOSRC = proto/common proto/termproxy proto/ctfoperator

IMAGEBASE = ghcr.io/lgorence/goctfprototype
IMAGETAG = latest

all: $(PROTOSRC) docker

docker: docker_penimage docker_termproxy docker_operator

$(PROTOSRC): %:%.proto
	protoc --go_out=proto/ --go_opt=paths=source_relative --go-grpc_out=proto/ --go-grpc_opt=paths=source_relative -I proto/ $<

docker_penimage:
	docker build -t $(IMAGEBASE)/penimage:$(IMAGETAG) images/penimage
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGEBASE)/penimage:$(IMAGETAG)
endif

docker_termproxy:
	docker build -t $(IMAGEBASE)/termproxy:$(IMAGETAG) -f images/termproxy/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGEBASE)/termproxy:$(IMAGETAG)
endif

docker_operator:
	docker build -t $(IMAGEBASE)/operator:$(IMAGETAG) -f images/operator/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGEBASE)/operator:$(IMAGETAG)
endif

lint:
	docker run -e RUN_LOCAL=true -e VALIDATE_DOCKERFILE_HADOLINT=false -e VALIDATE_CSS=false -e VALIDATE_JAVASCRIPT_STANDARD=false \
		-e VALIDATE_TYPESCRIPT_STANDARD=false -e VALIDATE_GO=false -e LOG_LEVEL=WARN -e FILTER_REGEX_EXCLUDE=".*pb.*" \
		-v $(shell pwd):/tmp/lint --rm github/super-linter:latest
