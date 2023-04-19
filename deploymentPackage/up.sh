#!/bin/bash
sudo systemctl start docker
sudo docker compose pull
sudo docker stop $(docker ps -a -q)
sudo docker rm $(docker ps -a -q)
sudo docker compose up
