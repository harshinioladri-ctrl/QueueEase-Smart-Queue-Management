# Deployment

## Run with Docker Compose

1. Copy `.env.example` to `.env` and set a unique `MYSQL_ROOT_PASSWORD`.
2. Run `docker compose up --build -d` from this directory.
3. The API will be available at `http://localhost:8080`; MySQL data is stored in the `mysql-data` volume.

Stop the services with `docker compose down`. To also delete the database volume, run `docker compose down -v`.

## Deploy to Railway

1. Install and authenticate the CLI: `npm install --global @railway/cli`, then `railway login`.
2. Create a Railway project and add a MySQL service in the Railway dashboard.
3. From this directory, run `railway link` and select that project, then run `railway up` to deploy the Dockerfile.
4. In the application service's Variables settings, set `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and `SPRING_DATASOURCE_PASSWORD` using the connection values shown by the MySQL service. The JDBC URL should use the MySQL private host, port, and database, for example `jdbc:mysql://HOST:PORT/DATABASE?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC`.
5. Set `APP_CORS_ALLOWED_ORIGINS` to the deployed frontend origin, then redeploy if Railway has not done so automatically.

Railway supplies `PORT` automatically. The included `railway.json` selects the Dockerfile build and restarts the app after failures.

## Other container hosts

Build and deploy the included `Dockerfile`. Configure these environment variables in the host dashboard:

- `PORT`: port supplied by the host (the application listens on this port).
- `SPRING_DATASOURCE_URL`: JDBC URL for a reachable MySQL 8 database.
- `SPRING_DATASOURCE_USERNAME` and `SPRING_DATASOURCE_PASSWORD`: database credentials.
- `APP_CORS_ALLOWED_ORIGINS`: comma-separated browser origins for the frontend, with no trailing slash.

Use a managed MySQL database with persistent backups. Do not use the local `.env` credentials in a hosted environment. The repository does not identify a hosting provider or provide deployment credentials, so cloud provisioning must be completed in the chosen provider account.