#!/bin/sh

repo=$1
token=RpbsnTznjQZXEy38EuU5 #meu token pessoal, zoa não
test -z $repo && echo "Repo name required." 1>&2 && exit 1
curl -H "Content-Type:application/json" https://gitlab.softbox.com.br/api/v3/projects?private_token=$token -d "{ \"name\": \"$repo\" }"
