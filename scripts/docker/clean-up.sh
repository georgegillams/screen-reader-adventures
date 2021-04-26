#!/bin/bash

containerId=$(docker ps -a | grep gg-snapshot-test  | awk '{print $1}')

# stop the container
docker container stop $containerId
