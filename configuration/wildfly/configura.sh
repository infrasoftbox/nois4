#!/bin/bash

ARQUIVO=standalone.xml
USERBANCO=$1
SENHABANCO=$2
URLBANCO=$3
LOCALCONFIG=$4

cp $ARQUIVO $ARQUIVO'_new'
sed -ie 's/{{userbanco}}/'$1'/g' $ARQUIVO'_new'
sed -ie 's/{{senhabanco}}/'$2'/g' $ARQUIVO'_new'
sed -ie 's/{{urlbanco}}/'$3'/g' $ARQUIVO'_new'

cp -f $ARQUIVO'_new' LOCALCONFIG'standalone.xml'

#ex. configura.sh userbanco senhabanco jdbc:postgresql://ip:5432/database /opt/wildfly/standalone/configuration/