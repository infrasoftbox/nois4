#!/bin/sh

repo=$1
pasta=$2
mkdir -p $pasta
cd $pasta
git clone $repo
