#!/usr/bin/env sh

sudo docker system prune && sudo docker build -t mern-blackbelt-exam:"$1" --target stage "."