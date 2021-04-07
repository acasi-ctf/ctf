PROTOSRC = proto/common proto/termproxy proto/ctfoperator proto/ctfoperator_internal

IMAGEBASE = ghcr.io/acasi-ctf/ctf
IMAGETAG = latest

all: proto docker

proto: $(PROTOSRC)
docker: docker_penimage docker_termproxy docker_operator docker_ui docker_frontend

$(PROTOSRC): %:%.proto
	mkdir -p pb/
	protoc --go_out=pb/ --go_opt=paths=source_relative --go-grpc_out=pb/ --go-grpc_opt=paths=source_relative -I proto/ $<

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

docker_ui:
	docker build -t $(IMAGEBASE)/ui:$(IMAGETAG) -f images/ui/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGEBASE)/ui:$(IMAGETAG)
endif

docker_frontend:
	docker build -t $(IMAGEBASE)/frontend:$(IMAGETAG) -f images/frontend/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGEBASE)/frontend:$(IMAGETAG)
endif

lint:
	docker run -e RUN_LOCAL=true -e VALIDATE_DOCKERFILE_HADOLINT=false -e VALIDATE_CSS=false -e VALIDATE_JAVASCRIPT_STANDARD=false \
		-e VALIDATE_TYPESCRIPT_STANDARD=false -e VALIDATE_GO=false -e VALIDATE_JSCPD=false -e VALIDATE_PYTHON_FLAKE8=false \
		-e VALIDATE_PYTHON_ISORT=false \
		-e LOG_LEVEL=WARN -e FILTER_REGEX_EXCLUDE=".*pb.*|frontend/migrations/*|challenges/.*\.py" -v $(shell pwd):/tmp/lint --rm github/super-linter:latest

gotest:
	go test ./...
