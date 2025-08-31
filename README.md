# My Profile API Playground (Track A Backend Assessment)

This project is a **Next.js full-stack application** for the **Track A Backend Assessment**. It exposes APIs to fetch my profile, skills, projects, work experience, and links, backed by a database with Prisma ORM. A minimal frontend is also provided to query and display the data.

---

## 🏗️ Architecture

```
+-----------------+         +-------------------+         +----------------+
|   Frontend UI   | <--->   |  Next.js API      | <--->   |   Database     |
| (React/Next.js) |         |  (App Router)     |         | (Postgres/Mongo)
+-----------------+         +-------------------+         +----------------+
```

* **Frontend:** Next.js pages consuming internal API routes.
* **Backend:** Next.js API routes (`/api/...`) using Prisma ORM.
* **Database:** PostgreSQL .
* **Hosting:** Vercel for both frontend and backend (single deployment).

---

## ⚙️ Setup Instructions

### 1. Local Development

#### Prerequisites

* Node.js >= 18
* npm 
* PostgreSQL

#### Steps

```bash
# Clone repo
git clone https://github.com/khairajram/profile.git


# Install deps
npm install

# Setup environment
cp .env.example .env
# Update DATABASE_URL in .env (e.g. for Postgres)
# DATABASE_URL="postgresql://user:password@localhost:5432/profiledb"

# Prisma migrations
npx prisma migrate dev --name init

# Run locally
npm run dev
```

Local app will run at `http://localhost:3000`

---

### 2. Production (Deployment)

* Deploy directly to **Vercel** (Next.js recommended host).
* Add environment variable `DATABASE_URL` in Vercel settings.
* Push migrations:

```bash
npx prisma migrate deploy
```

* App will be available at `[https://www.khairaj.tech/](https://www.khairaj.tech/)`

---

## 🗄️ Database Schema (Prisma)

```prisma
model Profile {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  education String
  about     String
  links     Links?
  skills    Skill[]
  projects  Project[]
  work      WorkExperience[]
}

model Skill {
  id       String   @id @default(uuid())
  name     String
  level    String?
  profile  Profile?  @relation(fields: [profileId], references: [id])
  profileId String?
}

model Project {
  id          String   @id @default(uuid())
  title       String
  description String
  link        String?
  techStack   String?
  profile     Profile?  @relation(fields: [profileId], references: [id])
  profileId   String?
}

model WorkExperience {
  id          String   @id @default(uuid())
  company     String
  role        String
  startDate   DateTime
  endDate     DateTime?
  description String?
  profile     Profile?  @relation(fields: [profileId], references: [id])
  profileId   String?
}

model Links {
  id        String   @id @default(uuid())
  github    String?
  linkedin  String?
  portfolio String?
  twitter   String?
  profile   Profile  @relation(fields: [profileId], references: [id])
  profileId String   @unique
}
```


## 🔌 API Endpoints

### Health

```bash
GET /api/health
# Response: { "status": "ok" }
```

### Profile

```bash
GET /api/profile
```

### Skills

```bash
GET /api/skills
GET /api/skills?id=next
```

### Projects

```bash
GET /api/projects
GET /api/projects?id=node
```

### Work Experience

```bash
GET /api/work
```

### Links

```bash
GET /api/links
```

---

## 📬 cURL / Postman Examples

**cURL:**

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/profile
curl http://localhost:3000/api/skills?id=node
```

---

## ⚠️ Known Limitations

* Authentication not implemented (all endpoints are public).
* Pagination missing (all results returned at once).
* Logging/monitoring not added.

---

## 📄 Resume

Resume is available at: [My Resume](./resume.pdf)

---

✅ This README covers architecture, setup, schema, sample data, API usage, Postman/cURL, and known issues.
