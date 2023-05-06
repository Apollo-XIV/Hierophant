#!/bin/bash
sudo systemctl start docker
sudo docker compose pull
sudo docker stop $(docker ps -a -q)
sudo docker rm $(docker ps -a -q)
docker run -d --name newrelic-infra --network=host --cap-add=SYS_PTRACE --privileged --pid=host -v "/:/host:ro" -v "/var/run/docker.sock:/var/run/docker.sock" -e  NRIA_LICENSE_KEY=eu01xx51db3f05d448877ca65cc1004072ebNRAL newrelic/infrastructure:latest
sudo docker compose up
sudo docker system prune --force
