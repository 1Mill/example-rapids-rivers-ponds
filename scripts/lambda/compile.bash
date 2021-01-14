#!/bin/bash

CONFIG_FILENAME=local.config
DIRECTORIES=$(
	find . \
	-name "$CONFIG_FILENAME" \
	-not -path "*node_modules*" \
	-not -path "*nuxt*" \
	-printf "%h\n"
)

for dir in $DIRECTORIES
do
	# * Reset / configure vars for lambda functions
	AWS_ENDPOINT=http://localhost:4566/
	FUNCTIONNAME=
	HANDLER=
	HOST_ABSOLUTEPATH=/$(cd -- $directory && pwd)
	RUNTIME=
	TYPE=

	# * Import configuration vars for lambda function
	source $dir/$CONFIG_FILENAME

	# * Skip if config type is not lambda
	if [[ "$TYPE" != "lambda" ]]
	then
		continue
	fi

	# * Compile lambda in a clean environment
	docker-compose -f $(dirname $BASH_SOURCE)/compile.docker-compose.yml down --volumes
	DIR=$(pwd)/$dir docker-compose -f $(dirname $BASH_SOURCE)/compile.docker-compose.yml up $RUNTIME
done
