#!/bin/bash
cd /home/ubuntu/app/circleci/muscleman && aws s3 cp s3://muscleman-deploy/.env.production ./.env && docker-compose up -d --force-recreate
