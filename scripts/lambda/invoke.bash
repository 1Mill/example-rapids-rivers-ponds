#!/bin/bash

AWS_ENDPOINT=http://localhost:4566/

aws lambda invoke \
	--cli-binary-format raw-in-base64-out \
	--function-name $1 \
	--invocation-type Event \
	--no-sign-request \
	--payload "{}" \
 	--endpoint $AWS_ENDPOINT \
	local.lambda.output.json
