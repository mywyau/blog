#!/usr/bin/env bash

git branch -D $(git branch | grep -v "main" | grep -v "master" | tr -d " ")