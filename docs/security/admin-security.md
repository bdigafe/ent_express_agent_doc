# Admin Portal Security

The Admin Portal is the high-privilege control plane for creating and managing agents and connectors. Access to this portal is strictly controlled through centralized identity management.

## Key Features
- **Identity Provider (IdP)**: Centralized user management via Auth0 or FusionAuth.
- **MFA Enforcement**: Mandatory Multi-Factor Authentication for all admin accounts.
- **RBAC**: Granular roles (Enterprise Admin, Workspace Admin) to limit exposure.

## Authentication Flow

```mermaid
sequenceDiagram
    participant AdminUser as Admin User
    participant AdminPortal as Admin Portal UI
    participant IdP as Identity Provider (Auth0)
    participant Backend as EEA Backend

    AdminUser->>AdminPortal: Access Portal
    AdminPortal->>IdP: Redirect to Login (OIDC)
    IdP-->>AdminUser: Prompt Credentials + MFA
    AdminUser->>IdP: Submit Credentials + MFA Code
    IdP->>AdminPortal: Return Access Token + ID Token
    AdminPortal->>Backend: API Request (Bearer Token)
    Backend->>Backend: Validate Token Signature & Scopes
    Backend-->>AdminPortal: Return Protected Data
```
