#!/bin/bash

# AutoPrestige Development Utilities

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
install() {
  echo -e "${YELLOW}Installing dependencies...${NC}"
  npm install
  echo -e "${GREEN}✓ Dependencies installed${NC}"
}

dev() {
  echo -e "${YELLOW}Starting development server...${NC}"
  npm run dev
}

build() {
  echo -e "${YELLOW}Building for production...${NC}"
  npm run build
}

start() {
  echo -e "${YELLOW}Starting production server...${NC}"
  npm start
}

lint() {
  echo -e "${YELLOW}Running linter...${NC}"
  npm run lint
}

setup() {
  echo -e "${YELLOW}Initial setup...${NC}"
  
  if [ ! -f .env.local ]; then
    echo -e "${YELLOW}Creating .env.local file...${NC}"
    cat > .env.local << EOF
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
    echo -e "${GREEN}✓ .env.local created (update with your Firebase credentials)${NC}"
  else
    echo -e "${YELLOW}.env.local already exists${NC}"
  fi
  
  install
  echo -e "${GREEN}✓ Setup complete!${NC}"
  echo -e "${YELLOW}Next steps:${NC}"
  echo "1. Update .env.local with your Firebase credentials"
  echo "2. Run 'npm run dev' to start the development server"
}

# Main
case "$1" in
  install)
    install
    ;;
  dev)
    dev
    ;;
  build)
    build
    ;;
  start)
    start
    ;;
  lint)
    lint
    ;;
  setup)
    setup
    ;;
  *)
    echo "Usage: $0 {install|dev|build|start|lint|setup}"
    echo ""
    echo "Commands:"
    echo "  install        Install dependencies"
    echo "  dev            Start development server"
    echo "  build          Build for production"
    echo "  start          Start production server"
    echo "  lint           Run linter"
    echo "  setup          Initial project setup"
    exit 1
    ;;
esac
