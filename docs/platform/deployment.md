# Deployment Options

Enterprise Express Agent (EEA) offers flexible deployment models to meet varying enterprise requirements for security, control, and maintenance.

## 1. EEA Cloud (Fully Managed)

EEA Cloud is our standard SaaS offering, designed for rapid onboarding and zero maintenance.

- **Managed Infrastructure**: We handle all provisioning, scaling, and database management.
- **Automatic Updates**: Always run on the latest version with security patches applied automatically.
- **Global Compliance**: Hosted in SOC 2 Type II compliant data centers with optional region selection (US, EU, APAC) for data residency.
- **SLA**: Guaranteed 99.9% availability with 24/7 support.

**Best for**: Most enterprises look for speed to market and reduced operational overhead.

## 2. Self-Hosted (Docker / Private Cloud)

For organizations with strict governance, data sovereignty, or virtual private cloud (VPC) requirements, EEA can be deployed closer to your data using our trusted container images.

### Architecture Overview

The Self-Hosted deployment consists of orchestrating two primary container images along with a PostgreSQL database.

1.  **`eea-backend`**: The FastAPI-based Agent Runtime and Orchestrator.
2.  **`eea-ui`**: The Next.js frontend application (Admin Portal & Agent UI).

### Prerequisites

To run EEA successfully in your environment, you will need:
- **Container Runtime**: Docker Engine (for testing) or Kubernetes (EKS, GKE, AKS) for production.
- **Database**: A PostgreSQL database (v14+) managed by you (e.g., RDS, Cloud SQL).
- **Connectivity**:
    - **Outbound**: The backend container must have outbound Internet access to reach LLM APIs (Google Gemini, OpenAI) and the target SaaS APIs you intend to connect with.
    - **Inbound**: Ingress controller to expose the UI and API endpoints over HTTPS.

### Configuration

Configuration is handled entirely via Environment Variables passed to the containers. Critical variables include:
- `DATABASE_URL`: Connection string to your PostgreSQL instance.
- `LLM_API_KEYS`: Credentials for your chosen LLM providers.
- `AUTH_CONFIG`: Details for your Identity Provider (Auth0/FusionAuth) client.
- `ENCRYPTION_MASTER_KEY`: A secure key used for envelope encryption of connector secrets.

### Example Docker Compose

For a quick Proof of Concept (PoC) or local testing:

```yaml
version: '3.8'
services:
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: securepassword
    volumes:
      - pgdata:/var/lib/postgresql/data

  eea-backend:
    image: ghcr.io/enterprise-express/backend:latest
    environment:
      - DATABASE_URL=postgresql://user:securepassword@db:5432/eea
      - OPENAI_API_KEY=sk-...
    ports:
      - "8000:8000"
    depends_on:
      - db

  eea-ui:
    image: ghcr.io/enterprise-express/ui:latest
    environment:
      - NEXT_PUBLIC_API_URL=http://eea-backend:8000
    ports:
      - "3000:3000"

volumes:
  pgdata:
```
