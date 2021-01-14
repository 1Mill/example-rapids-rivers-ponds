#!/bin/bash

source $(dirname $BASH_SOURCE)/SERVICES.bash
for dir in ${CORE_SERVICES[@]}
do
	cd $(pwd)/$dir && docker-compose down --volumes &
done
wait
