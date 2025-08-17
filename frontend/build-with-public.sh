#!/bin/bash

# Build the project
npm run build:prod

# Double-check that public files are in dist (Vite should copy them automatically)
if [ ! -f "dist/favicon.ico" ]; then
  echo "Public files not found in dist, copying manually..."
  cp -r public/* dist/
else
  echo "Public files already in dist, no manual copy needed"
fi

echo "Build complete with public files in dist/"
