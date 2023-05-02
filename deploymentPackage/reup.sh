sudo systemctl start docker
sudo docker pull apolloxiv/uitest
sudo docker kill proc123
sudo docker rm proc123
sudo docker run -p 80:5173 --name proc123 apolloxiv/uitest