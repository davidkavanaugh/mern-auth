#!/usr/bin/env sh

sudo docker stop mern-blackbelt-exam-local
sudo docker rm mern-blackbelt-exam-local
sudo docker run -d -p 8000:8000 --name mern-blackbelt-exam-local mern-blackbelt-exam:"$1"