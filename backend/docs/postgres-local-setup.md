# Setting up PostgreSQL 17.x Locally

## Installation Steps

1. Add the PostgreSQL repository:

```bash
# Create the file repository configuration
sudo sh -c 'echo "deb https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

# Import the repository signing key
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Update the package lists
sudo apt-get update
```

2. Install PostgreSQL 17:

```bash
sudo apt-get -y install postgresql-17
```

3. Verify the installation:

```bash
psql --version
```

4. Start and enable the PostgreSQL service:

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

5. Create a database and user:

```bash
# Switch to the postgres user
sudo -i -u postgres

# Create a new user (replace 'myuser' and 'mypassword' with your preferred values)
createuser --interactive --pwprompt myuser

# Create a new database (replace 'mydatabase' with your preferred name)
createdb --owner=myuser mydatabase

# Exit the postgres user shell
exit
```

6. Update your .env file with the new connection string:

```
DATABASE_URL=postgres://myuser:mypassword@localhost:5432/mydatabase
```

7. Test the connection:

```bash
psql -U myuser -d mydatabase -h localhost
```

## Troubleshooting

If you encounter issues with the PostgreSQL service, you can check its status:

```bash
sudo systemctl status postgresql
```

To view PostgreSQL logs:

```bash
sudo tail -f /var/log/postgresql/postgresql-17-main.log
```
