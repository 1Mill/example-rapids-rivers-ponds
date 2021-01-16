#!/bin/bash

AWS_ENDPOINT=http://localhost:4566/
CONFIG_FILENAME=local.config
DIRECTORIES=$(
	find ${1-.} \
	-name "$CONFIG_FILENAME" \
	-not -path "*node_modules*" \
	-not -path "*nuxt*" \
	-printf "%h\n"
)

for dir in $DIRECTORIES
do
	# * Reset / configure vars for lambda functions
	FUNCTIONNAME=
	HANDLER=
	RUNTIME=
	TYPE=
	ENVIRONMENT=

	# * Import configuration vars for lambda function
	source $dir/$CONFIG_FILENAME

	# * Skip if config type is not lambda
	if [[ "$TYPE" != "lambda" ]]
	then
		continue
	fi

	# * Compile lambda in a clean environment
	DIR=$(pwd)/$dir docker-compose -f $(dirname $BASH_SOURCE)/compile.docker-compose.yml down --volumes
	DIR=$(pwd)/$dir docker-compose -f $(dirname $BASH_SOURCE)/compile.docker-compose.yml up $RUNTIME

	# * Delete lambda function if it already exists in local AWS
	aws --endpoint-url $AWS_ENDPOINT \
		lambda delete-function \
			--function-name $FUNCTIONNAME

	# * Create lambda function in local AWS
	aws --endpoint-url $AWS_ENDPOINT \
		lambda create-function \
			--code S3Bucket="__local__",S3Key="$(pwd)/$dir" \
			--function-name $FUNCTIONNAME \
			--handler $HANDLER \
			--role just-has-to-exist \
			--runtime $RUNTIME

	# * If environmental varaibles are present, add them to the lambda configuration
	if [ -n "$ENVIRONMENT" ]
	then
		aws --endpoint-url $AWS_ENDPOINT \
			lambda update-function-configuration \
				--environment "Variables=$ENVIRONMENT" \
				--function-name $FUNCTIONNAME
	fi
done
