#!/bin/bash

# Script to set up a local PostgreSQL database for development

# Configuration
DB_NAME="nucleus_db"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_HOST="localhost"
DB_PORT="5432"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Setting up local PostgreSQL database for development...${NC}"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}PostgreSQL is not installed. Please install PostgreSQL first.${NC}"
    exit 1
fi

# Check PostgreSQL version
PG_VERSION=$(psql --version | grep -oP 'PostgreSQL\s+\K[0-9]+')
echo -e "${GREEN}PostgreSQL version: ${PG_VERSION}${NC}"

# Create database if it doesn't exist
echo -e "${YELLOW}Creating database ${DB_NAME} if it doesn't exist...${NC}"
if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw ${DB_NAME}; then
    echo -e "${GREEN}Database ${DB_NAME} already exists.${NC}"
else
    sudo -u postgres psql -c "CREATE DATABASE ${DB_NAME};"
    echo -e "${GREEN}Database ${DB_NAME} created.${NC}"
fi

# Create user if it doesn't exist
echo -e "${YELLOW}Ensuring user ${DB_USER} exists...${NC}"
if sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='${DB_USER}'" | grep -q 1; then
    echo -e "${GREEN}User ${DB_USER} already exists.${NC}"
else
    sudo -u postgres psql -c "CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';"
    echo -e "${GREEN}User ${DB_USER} created.${NC}"
fi

# Grant privileges
echo -e "${YELLOW}Granting privileges to ${DB_USER} on ${DB_NAME}...${NC}"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};"
echo -e "${GREEN}Privileges granted.${NC}"

# Update .env file
echo -e "${YELLOW}Updating .env file with database connection string...${NC}"
if [ -f .env ]; then
    # Check if DATABASE_URL already exists
    if grep -q "^DATABASE_URL=" .env; then
        # Replace the active DATABASE_URL line
        sed -i "s|^DATABASE_URL=.*|DATABASE_URL=postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}|" .env
    else
        # Add DATABASE_URL if it doesn't exist
        echo "DATABASE_URL=postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}" >> .env
    fi
    echo -e "${GREEN}.env file updated.${NC}"
else
    echo -e "${RED}.env file not found. Creating a new one...${NC}"
    echo "DATABASE_URL=postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}" > .env
    echo -e "${GREEN}Created new .env file.${NC}"
fi

echo -e "${GREEN}Local PostgreSQL database setup complete!${NC}"
echo -e "${YELLOW}You can now run migrations with: npm run db:migrate${NC}"
