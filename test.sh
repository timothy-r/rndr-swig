#!/usr/bin/env bash

# send a test template

HOST=192.168.59.103
PORT=8002

curl -X PUT \
     -H 'Content-Type: application/vnd.rndr.swig' \
     -d @hello.html \
     http://$HOST:$PORT/test/hello \
     -v

curl -X GET \
     http://$HOST:$PORT/test/hello \
     -v

curl -X POST \
     -d '{"name":"Malcolm"}' \
     http://$HOST:$PORT/test/hello \
     -v

curl -X DELETE \
     http://$HOST:$PORT/test/hello \
     -v

curl -X GET \
     http://$HOST:$PORT/test/hello \
     -v