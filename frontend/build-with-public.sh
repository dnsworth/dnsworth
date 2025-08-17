#!/bin/bash

# Build the project
npm run build:prod

# Ensure public files are copied to dist
cp -r public/* dist/

echo "Build complete with public files copied to dist/"
