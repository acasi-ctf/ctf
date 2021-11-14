# How to build this image

```
cd challenges/kali/Intro

# This will build the image and keep it hosted locally.
docker build -t ghcr.io/acasi-ctf/ctf/challenges/kali-intro:latest .

# This will start the container, and because it's running on the penimage, the default command is our SSH server.
docker run --name ctf -it --rm ghcr.io/acasi-ctf/ctf/challenges/kali-intro:latest

# To get into it without ssh, you can manually execute a shell with `docker exec`.
# Now, from a different terminal while `docker run` is running in the background.
docker ps

docker exec -it ctf /bin/bash

docker push ghcr.io/acasi-ctf/ctf/challenges/kali-intro:latest


#Push To Repo
docker login ghcr.io

docker push ghcr.io/acasi-ctf/ctf/challenges/kali-intro:latest
```


