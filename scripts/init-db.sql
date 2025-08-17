-- Initialize database for TypeScript Monorepo Starter

-- Create development database if it doesn't exist
SELECT 'CREATE DATABASE monorepo_starter_dev'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'monorepo_starter_dev')\gexec

-- Create test database if it doesn't exist  
SELECT 'CREATE DATABASE monorepo_starter_test'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'monorepo_starter_test')\gexec

-- Create a dedicated user for the application (optional, for production use)
-- DO $$ 
-- BEGIN
--     CREATE ROLE monorepo_user WITH LOGIN PASSWORD 'secure_password';
--     GRANT ALL PRIVILEGES ON DATABASE monorepo_starter TO monorepo_user;
--     GRANT ALL PRIVILEGES ON DATABASE monorepo_starter_dev TO monorepo_user;
--     GRANT ALL PRIVILEGES ON DATABASE monorepo_starter_test TO monorepo_user;
-- EXCEPTION WHEN duplicate_object THEN
--     RAISE NOTICE 'User already exists';
-- END
-- $$;