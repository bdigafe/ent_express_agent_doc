# Connector Security

Connectors are the secure tunnels through which Agents interact with external APIs, MCP Servers, and even sub-agents. 

## Key Features
- **Encryption at Rest**: All credentials (API Keys, OAuth Tokens) are encrypted in the database.
- **Least Privilege**: Connectors are scoped to specific operations defined in the OpenAPI spec.
- **Token Management**: Automated OAuth2 token refresh workflows.

## Connector Execution Flow

API or MCP servers may define their own authentication schemes such as API keys, username/password, or OAuth2. The system automatically determines the required authentication scheme and invokes the tool accordingly. The diagram below illustrates the flow for a connector requiring OAuth2 authentication.

```mermaid
sequenceDiagram
    participant Agent as Agent Execution
    participant Vault as Secure Vault
    participant SaaS as External SaaS API

    Agent->>Vault: Request Credentials for Connector X
    Vault->>Vault: Decrypt API Key / Refresh OAuth Token
    Vault-->>Agent: Return Ephemeral Access Token
    Agent->>SaaS: HTTPS Request + Authorization Header
    SaaS-->>Agent: JSON Response
```
