#!/bin/bash

docker network create services-network

source $(dirname $BASH_SOURCE)/SERVICES.bash
for dir in ${CORE_SERVICES[@]}
do
	cd $(pwd)/$dir && docker-compose up --build --detach &
done
wait
