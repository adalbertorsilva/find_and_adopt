#!/bin/bash

set -xe

until pg_isready -U $DATABASE_USER -h $DATABASE_HOST; do
  sleep 5;
done

npm start