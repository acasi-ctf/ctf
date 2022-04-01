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
docker_challenges: docker_challenge_cipher_caesar docker_challenge_cipher_comprehensive \
					docker_challenge_cipher_letter_number docker_challenge_cipher_morse \
					docker_challenge_cipher_reverse \
					docker_challenge_games_noughts docker_challenge_games_prize \
					docker_challenge_games_rps docker_challenge_games_seven_up \
					docker_challenge_games_yahtzee \
					docker_challenge_pentesting_binwalk \
					docker_challenge_pentesting_hashidentifier \
					docker_challenge_pentesting_hashcat docker_challenge_pentesting_strings \
					docker_challenge_maths_arithmetic


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

docker_challenge_cipher_caesar:
	docker build -t $(IMAGE_CHALLENGES_BASE)/ciphers/caesar:$(IMAGE_TAG) -f images/challenges/ciphers/caesar/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/ciphers/caesar:$(IMAGE_TAG)
endif

docker_challenge_cipher_comprehensive:
	docker build -t $(IMAGE_CHALLENGES_BASE)/ciphers/comprehensive:$(IMAGE_TAG) -f images/challenges/ciphers/comprehensive/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/ciphers/comprehensive:$(IMAGE_TAG)
endif

docker_challenge_cipher_letter_number:
	docker build -t $(IMAGE_CHALLENGES_BASE)/ciphers/letter-number:$(IMAGE_TAG) -f images/challenges/ciphers/letter-number/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/ciphers/letter-number:$(IMAGE_TAG)
endif

docker_challenge_cipher_morse:
	docker build -t $(IMAGE_CHALLENGES_BASE)/ciphers/morse:$(IMAGE_TAG) -f images/challenges/ciphers/morse/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/ciphers/morse:$(IMAGE_TAG)
endif

docker_challenge_cipher_reverse:
	docker build -t $(IMAGE_CHALLENGES_BASE)/ciphers/reverse:$(IMAGE_TAG) -f images/challenges/ciphers/reverse/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/ciphers/reverse:$(IMAGE_TAG)
endif

docker_challenge_games_noughts:
	docker build -t $(IMAGE_CHALLENGES_BASE)/games/noughts:$(IMAGE_TAG) -f images/challenges/games/noughts/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/games/noughts:$(IMAGE_TAG)
endif

docker_challenge_games_prize:
	docker build -t $(IMAGE_CHALLENGES_BASE)/games/prize:$(IMAGE_TAG) -f images/challenges/games/prize/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/games/prize:$(IMAGE_TAG)
endif

docker_challenge_games_rps:
	docker build -t $(IMAGE_CHALLENGES_BASE)/games/rock-paper-scissors:$(IMAGE_TAG) -f images/challenges/games/rock-paper-scissors/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/games/rock-paper-scissors:$(IMAGE_TAG)
endif

docker_challenge_games_seven_up:
	docker build -t $(IMAGE_CHALLENGES_BASE)/games/seven-up:$(IMAGE_TAG) -f images/challenges/games/seven-up/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/games/seven-up:$(IMAGE_TAG)
endif

docker_challenge_games_yahtzee:
	docker build -t $(IMAGE_CHALLENGES_BASE)/games/yahtzee:$(IMAGE_TAG) -f images/challenges/games/yahtzee/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/games/yahtzee:$(IMAGE_TAG)
endif

docker_challenge_pentesting_binwalk:
	docker build -t $(IMAGE_CHALLENGES_BASE)/pentesting/binwalk:$(IMAGE_TAG) -f images/challenges/pentesting/binwalk/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/pentesting/binwalk:$(IMAGE_TAG)
endif

docker_challenge_pentesting_hashidentifier:
	docker build -t $(IMAGE_CHALLENGES_BASE)/pentesting/hash-identifier:$(IMAGE_TAG) -f images/challenges/pentesting/hash-identifier/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/pentesting/hash-identifier:$(IMAGE_TAG)
endif

docker_challenge_pentesting_hashcat:
	docker build -t $(IMAGE_CHALLENGES_BASE)/pentesting/hashcat:$(IMAGE_TAG) -f images/challenges/pentesting/hashcat/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/pentesting/hashcat:$(IMAGE_TAG)
endif

docker_challenge_pentesting_strings:
	docker build -t $(IMAGE_CHALLENGES_BASE)/pentesting/strings:$(IMAGE_TAG) -f images/challenges/pentesting/strings/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/pentesting/strings:$(IMAGE_TAG)
endif

docker_challenge_maths_arithmetic:
	docker build -t $(IMAGE_CHALLENGES_BASE)/maths/arithmetic:$(IMAGE_TAG) -f images/challenges/maths/arithmetic/Dockerfile .
ifeq ($(DOCKER_PUSH), 1)
		docker push $(IMAGE_CHALLENGES_BASE)/maths/arithmetic:$(IMAGE_TAG)
endif

lint:
	docker run -e RUN_LOCAL=true -e VALIDATE_DOCKERFILE_HADOLINT=false -e VALIDATE_CSS=false -e VALIDATE_JAVASCRIPT_STANDARD=false \
		-e VALIDATE_TYPESCRIPT_STANDARD=false -e VALIDATE_GO=false -e VALIDATE_JSCPD=false -e VALIDATE_PYTHON_FLAKE8=false \
		-e VALIDATE_PYTHON_ISORT=false -e VALIDATE_KUBERNETES_KUBEVAL=false -e VALIDATE_KOTLIN=false -e VALIDATE_PROTOBUF=false \
		-e VALIDATE_PYTHON_MYPY=false \
		-e LOG_LEVEL=WARN -e FILTER_REGEX_EXCLUDE=".*pb.*|frontend/migrations/*|challenges/.*|gradlew*" -v $(shell pwd):/tmp/lint --rm github/super-linter:latest

gotest:
	go test ./...
