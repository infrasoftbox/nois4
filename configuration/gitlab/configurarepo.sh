#!/bin/sh

repo=$1
pasta=$2
mkdir /tmp/projeto/
cd /tmp/projeto/
git clone $repo
mv $pasta /tmp/projeto/
git add *
git commit -m "Commit Inicial"
git push origin master
rm -rf /tmp/projeto/
