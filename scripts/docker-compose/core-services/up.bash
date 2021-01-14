#!/bin/bash

docker network create services-network

source $(dirname $BASH_SOURCE)/SERVICES.bash
for dir in ${CORE_SERVICES[@]}
do
	echo $dir &
done
wait
