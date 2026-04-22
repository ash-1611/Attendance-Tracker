#!/bin/bash

# Create directory structure
mkdir -p backend/{src/{models,controllers,routes,middleware,services,config},tests,uploads}
mkdir -p frontend/{public,src/{components,pages,services,hooks,utils,styles,assets}}
mkdir -p docker
mkdir -p docs

# Backend directories
mkdir -p backend/src/validators
mkdir -p backend/src/errors
mkdir -p backend/src/helpers

# Frontend directories  
mkdir -p frontend/src/contexts
mkdir -p frontend/src/types
mkdir -p frontend/src/constants

echo "✅ Directory structure created successfully"
