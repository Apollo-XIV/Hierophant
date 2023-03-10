# Hierophant
This is the source code for my personal blog and (future) quiz-site. This is primarily a learning exercise for myself, however, should anyone like to contribute they're more than welcome.

### Docker build commands
docker build -t apolloxiv/hierophant

docker run -dp 5173:5173 --name hierophant --mount type=bind,source="$(pwd)",target=/usr/src/app apolloxiv/hierophant
