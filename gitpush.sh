#!/bin/bash

# Check if commit message was supplied
if [ -z "$1" ]
then
  echo "Error: No commit message provided. Usage: ./push_to_github.sh 'Your commit message'"
  exit 1
fi

# Add all changes to staging
git add .

# Commit with provided message
git commit -m "$1"

# Push to main branch on GitHub
git push origin main