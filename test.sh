#!/usr/bin/env bash

# send a test template

HOST=192.168.59.103
PORT=8002

curl -X PUT \
     -H 'Content-Type: application/vnd.rndr.swig-v1+html' \
     -d '<p>Hello {{ name }}</p>' \
     http://$HOST:$PORT/test/hello \
     -v