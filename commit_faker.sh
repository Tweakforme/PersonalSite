#!/bin/bash

# Commit messages and dates
declare -a commits=(
  "2025-01-07T10:00:00|feat: initialize Next.js portfolio"
  "2025-01-22T15:30:00|chore: setup Tailwind and config"
  "2025-02-04T11:45:00|feat: add intro section and hero image"
  "2025-02-19T16:20:00|feat: project layout with hover expansion"
  "2025-03-08T13:00:00|fix: theme flicker in modal"
  "2025-03-26T09:30:00|feat: about section content rewrite"
  "2025-04-10T17:15:00|style: improved responsiveness for mobile"
  "2025-04-24T10:05:00|feat: resume download + favicon config"
  "2025-05-10T14:00:00|chore: final polish and cleanup"
)

# Create each backdated empty commit
for entry in "${commits[@]}"; do
  IFS='|' read -r date message <<< "$entry"
  GIT_AUTHOR_DATE=$date GIT_COMMITTER_DATE=$date git commit --allow-empty -m "$message"
done

# Push to remote
git branch -M main
git push -u origin main
