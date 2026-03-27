# 2R Fusion - Environment Configuration

Complete guide to setting up environment variables and configuring the 2R Fusion platform for development and production.

## Overview

The 2R Fusion platform uses environment variables to configure:
- Database connections
- Authentication secrets
- Third-party service credentials
- Application settings
- Feature flags

## Development Setup

### 1. Create Environment File

```bash
# From project root
cp .env.example .env.local
```

### 2. Development Environment Variables

```env
# DATABASE
DATABASE_URL="file:./dev.db"
PRISMA_DATABASE_URL="file:./dev.db"

# NEXTAUTH
NEXTAUTH_SECRET="your-secret-key-min-32-chars-generated-by-openssl"
NEXTAUTH_URL="http://localhost:3000"

# APPLICATION
NODE_ENV="development"
NEXT_PUBLIC_API_URL="http://localhost:3000"

# OPTIONAL: Future Integrations (not used in v1.0.0)
# STRIPE_PUBLIC_KEY=""
# STRIPE_SECRET_KEY=""
# CMI_MERCHANT_ID=""
# CMI_API_KEY=""
# TWILIO_ACCOUNT_SID=""
# TWILIO_AUTH_TOKEN=""
# SENDGRID_API_KEY=""
# AWS_ACCESS_KEY_ID=""
# AWS_SECRET_ACCESS_KEY=""
```

### 3. Generate NEXTAUTH_SECRET

```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Set Up SQLite Database

SQLite database is automatically created at `prisma/dev.db` on first run.

```bash
# Generate Prisma client
npx prisma generate

# Create database and run migrations
npx prisma migrate dev

# Seed with demo data
npm run db:seed

# View database in Prisma Studio
npx prisma studio
```

### 5. Verify Setup

```bash
# Start development server
npm run dev

# Server should start on http://localhost:3000
# Login with admin@2rfusion.ma / admin123
```

---

## Production Setup

### 1. Database Configuration

#### Option A: Supabase PostgreSQL (Recommended)

Supabase provides managed PostgreSQL with easy setup:

```bash
# 1. Sign up at https://supabase.com
# 2. Create new project
# 3. Copy connection string from project settings
# 4. Format: postgresql://user:password@host:port/database?sslmode=require
```

Set in `.env.production`:
```env
DATABASE_URL="postgresql://user:password@project.supabase.co:5432/postgres?sslmode=require"
```

#### Option B: Self-Hosted PostgreSQL

```bash
# Install PostgreSQL (example for Ubuntu)
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb 2r_fusion

# Create user
sudo -u postgres createuser 2r_user
sudo -u postgres psql -c "ALTER USER 2r_user WITH PASSWORD 'secure_password';"

# Grant privileges
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE 2r_fusion TO 2r_user;"
```

Connection string:
```env
DATABASE_URL="postgresql://2r_user:secure_password@localhost:5432/2r_fusion"
```

### 2. Production Environment File

Create `.env.production`:

```env
# DATABASE
DATABASE_URL="postgresql://user:password@host:5432/database"

# NEXTAUTH
NEXTAUTH_SECRET="your-production-secret-key-32-chars-min"
NEXTAUTH_URL="https://2rfusion.yourdomain.com"

# APPLICATION
NODE_ENV="production"
NEXT_PUBLIC_API_URL="https://2rfusion.yourdomain.com"

# SECURITY
SECURE_COOKIES="true"
CSRF_PROTECTION="true"

# OPTIONAL: Third-party Services (Phase 2+)
# STRIPE_PUBLIC_KEY="pk_live_..."
# STRIPE_SECRET_KEY="sk_live_..."
# CMI_MERCHANT_ID="..."
# CMI_API_KEY="..."
# TWILIO_ACCOUNT_SID="..."
# TWILIO_AUTH_TOKEN="..."
# SENDGRID_API_KEY="..."
# AWS_ACCESS_KEY_ID="..."
# AWS_SECRET_ACCESS_KEY="..."
```

### 3. Production Deployment

#### Using Vercel (Easiest)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel --prod

# 4. Set environment variables in Vercel Dashboard
#    Project Settings → Environment Variables
```

#### Using Heroku

```bash
# 1. Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# 2. Login
heroku login

# 3. Create app
heroku create 2r-fusion

# 4. Add PostgreSQL
heroku addons:create heroku-postgresql:standard-0

# 5. Set environment variables
heroku config:set NEXTAUTH_SECRET="..."
heroku config:set NEXTAUTH_URL="https://2r-fusion.herokuapp.com"

# 6. Deploy
git push heroku main
```

#### Using AWS (EC2)

```bash
# 1. Launch EC2 instance (Ubuntu 22.04)
# 2. SSH into instance
ssh -i key.pem ubuntu@your-instance.compute.amazonaws.com

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# 5. Clone repository
git clone <repo-url>
cd 2r-fusion

# 6. Install dependencies
npm install

# 7. Create .env.production with database credentials
nano .env.production

# 8. Run migrations
npx prisma migrate deploy

# 9. Seed database (optional)
npm run db:seed

# 10. Build application
npm run build

# 11. Start with PM2 (process manager)
npm install -g pm2
pm2 start npm --name "2r-fusion" -- start
pm2 save
pm2 startup
```

### 4. Database Migrations

For production, use Prisma migrations:

```bash
# Create migration from schema changes
npx prisma migrate dev --name add_new_table

# Apply migrations in production
npx prisma migrate deploy

# Reset database (⚠️ destructive - dev only)
npx prisma migrate reset
```

### 5. Backup Strategy

#### Supabase Automatic Backups
Supabase automatically backs up your database daily.

#### Manual Backups (PostgreSQL)

```bash
# Backup database
pg_dump -U 2r_user -h localhost 2r_fusion > backup_$(date +%Y%m%d).sql

# Restore from backup
psql -U 2r_user -h localhost 2r_fusion < backup_20260327.sql
```

---

## Third-Party Service Configuration

### Payment Gateway (Phase 2+)

#### CMI Morocco Setup
```env
CMI_MERCHANT_ID="your_merchant_id"
CMI_API_KEY="your_api_key"
CMI_ENVIRONMENT="production"  # or "test"
```

#### Stripe Setup
```env
STRIPE_PUBLIC_KEY="pk_live_xxxxx"
STRIPE_SECRET_KEY="sk_live_xxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxx"
```

### SMS Service (Phase 2+)

#### Twilio Setup
```env
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+212xxxxx"
```

### Email Service (Phase 2+)

#### SendGrid Setup
```env
SENDGRID_API_KEY="SG.xxxxx"
SENDGRID_FROM_EMAIL="noreply@2rfusion.ma"
SENDGRID_FROM_NAME="2R Fusion"
```

### Cloud Storage (Phase 2+)

#### AWS S3 Setup
```env
AWS_REGION="eu-west-1"
AWS_ACCESS_KEY_ID="AKIA..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="2r-fusion-uploads"
AWS_S3_UPLOAD_FOLDER="images/"
```

---

## Docker Setup (Optional)

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application
COPY . .

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: 2r_fusion
      POSTGRES_USER: 2r_user
      POSTGRES_PASSWORD: secure_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  app:
    build: .
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgresql://2r_user:secure_password@postgres:5432/2r_fusion
      NEXTAUTH_SECRET: your-secret-key
      NEXTAUTH_URL: http://localhost:3000
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules

volumes:
  postgres_data:
```

### Run with Docker

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop
docker-compose down
```

---

## Environment Variable Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | - | PostgreSQL or SQLite connection string |
| `NEXTAUTH_SECRET` | Yes | - | Secret key for NextAuth.js (32+ chars) |
| `NEXTAUTH_URL` | Yes | - | Application URL for authentication |
| `NODE_ENV` | No | development | Environment (development, production, test) |
| `NEXT_PUBLIC_API_URL` | No | http://localhost:3000 | Public API base URL |
| `PRISMA_DATABASE_URL` | No | DATABASE_URL | Override database for Prisma |

---

## Troubleshooting

### Database Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
- Verify PostgreSQL is running
- Check DATABASE_URL is correct
- Ensure database user has correct password
- Test connection: `psql -U user -d database`

### NEXTAUTH_SECRET Not Set

```
Error: No session secret configured. Please set NEXTAUTH_SECRET in .env.local
```

**Solution:**
```bash
# Generate secret
openssl rand -base64 32

# Add to .env.local
NEXTAUTH_SECRET="generated-secret-here"
```

### Prisma Client Not Generated

```
Error: @prisma/client did not initialize yet. Please run "prisma generate"
```

**Solution:**
```bash
npx prisma generate
```

### Port 3000 Already in Use

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

---

## Security Best Practices

1. **Never commit `.env.production`** - Use environment variable management in your hosting platform
2. **Rotate NEXTAUTH_SECRET regularly** - Change quarterly or after suspected compromise
3. **Use HTTPS in production** - Always redirect HTTP to HTTPS
4. **Enable CSRF protection** - Enabled by default in production
5. **Secure database credentials** - Use strong passwords, rotate regularly
6. **Monitor access logs** - Track who accesses admin functions
7. **Regular backups** - Daily automated backups essential
8. **Update dependencies** - Run `npm audit fix` monthly

---

## Development vs Production Checklist

### Development ✓
- SQLite database
- HTTP connections allowed
- Demo credentials active
- Detailed error messages
- Hot reload enabled

### Production ✓
- PostgreSQL database
- HTTPS required
- Strong passwords set
- Limited error details
- Authentication enabled
- Backups configured
- Monitoring active
- Rate limiting enabled
- CORS properly configured

---

**Environment Configuration Version:** 1.0.0  
**Last Updated:** March 27, 2026
