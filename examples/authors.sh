#!/usr/bin/env bash

# send a test template

HOST=192.168.59.103
PORT=8002

curl -X PUT \
     -H 'Content-Type: application/vnd.rndr.swig' \
     -d @authors.html \
     http://$HOST:$PORT/test/authors \
     -v

curl -X GET \
     http://$HOST:$PORT/test/authors \
     -v

curl -X POST \
     -d '{"authors":["Stephen King", "JRR Tolkein", "James Joyce","Margaret Atwood"]}' \
     http://$HOST:$PORT/test/authors \
     -v

curl -X DELETE \
     http://$HOST:$PORT/test/authors \
     -v

curl -X GET \
     http://$HOST:$PORT/test/authors \
     -v
