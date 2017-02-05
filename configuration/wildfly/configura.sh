#!/bin/bash

ARQUIVO=standalone.xml
USERBANCO=$1
SENHABANCO=$2
URLBANCO=$3
cp $ARQUIVO $ARQUIVO'_new'
sed -ie 's/{{userbanco}}/'$1'/g' $ARQUIVO'_new'
sed -ie 's/{{senhabanco}}/'$2'/g' $ARQUIVO'_new'
sed -ie 's/{{urlbanco}}/'$3'/g' $ARQUIVO'_new'