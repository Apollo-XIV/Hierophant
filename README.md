# Hierophant
docker build -t apolloxiv/hierophant
docker run -dp 5173:5173 --name hierophant --mount type=bind,source="$(pwd)",target=/usr/src/app apolloxiv/hierophant
