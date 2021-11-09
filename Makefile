PROTOSRC = proto/common proto/termproxy proto/ctfoperator proto/ctfoperator_internal

IMAGE_CTF_BASE        ?= ghcr.io/acasi-ctf/ctf
IMAGE_CHALLENGES_BASE ?= ghcr.io/acasi-ctf/challenges
IMAGE_TAG             ?= latest

docker_info:
	@echo Platform base:   $(IMAGE_CTF_BASE)
	@echo Challenges base: $(IMAGE_CHALLENGES_BASE)
	@echo Image tag:       $(IMAGE_TAG)

all: proto docker

proto: $(PROTOSRC)
docker: docker_penimage docker_termproxy docker_ui docker_frontend docker_operatorkt

$(PROTOSRC): %:%.proto
	mkdir -p pb/
	protoc --go_out=pb/ --go_opt=paths=source_relative --go-grpc_out=pb/ --go-grpc_opt=paths=source_relative -I proto/ $<

	mkdir -p frontend/pb
	pipenv run python -m grpc_tools.protoc --python_out=frontend/pb --grpc_python_out=frontend/pb -I proto/ $<

docker_penimage:
	docker build -t $(IMAGE_CTF_BASE)/penimage:$(IMAGE_TAG) images/penimage
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CTF_BASE)/penimage:$(IMAGE_TAG)
endif

docker_termproxy:
	docker build -t $(IMAGE_CTF_BASE)/termproxy:$(IMAGE_TAG) -f images/termproxy/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CTF_BASE)/termproxy:$(IMAGE_TAG)
endif

docker_operatorkt:
	docker build -t $(IMAGE_CTF_BASE)/operatorkt:$(IMAGE_TAG) -f images/operatorkt/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CTF_BASE)/operatorkt:$(IMAGE_TAG)
endif

docker_ui:
	docker build -t $(IMAGE_CTF_BASE)/ui:$(IMAGE_TAG) -f images/ui/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CTF_BASE)/ui:$(IMAGE_TAG)
endif

docker_frontend:
	docker build -t $(IMAGE_CTF_BASE)/frontend:$(IMAGE_TAG) -f images/frontend/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CTF_BASE)/frontend:$(IMAGE_TAG)
endif

docker_challenge_cipher:
	docker build -t $(IMAGE_CHALLENGES_BASE)/ciphers:$(IMAGE_TAG) -f images/challenges/ciphers/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/ciphers:$(IMAGE_TAG)
endif

lint:
	docker run -e RUN_LOCAL=true -e VALIDATE_DOCKERFILE_HADOLINT=false -e VALIDATE_CSS=false -e VALIDATE_JAVASCRIPT_STANDARD=false \
		-e VALIDATE_TYPESCRIPT_STANDARD=false -e VALIDATE_GO=false -e VALIDATE_JSCPD=false -e VALIDATE_PYTHON_FLAKE8=false \
		-e VALIDATE_PYTHON_ISORT=false -e VALIDATE_KUBERNETES_KUBEVAL=false -e VALIDATE_KOTLIN=false -e VALIDATE_PROTOBUF=false \
		-e VALIDATE_PYTHON_MYPY=false \
		-e LOG_LEVEL=WARN -e FILTER_REGEX_EXCLUDE=".*pb.*|frontend/migrations/*|challenges/.*|gradlew*" -v $(shell pwd):/tmp/lint --rm github/super-linter:latest

gotest:
	go test ./...
