# End-User Authentication

To support seamless embedding within SaaS applications (via IFrame) while maintaining high security, EEA uses a **Server-Side Token Handoff** pattern.

## Key Features
- **No Third-Party Cookies**: Works in all modern browsers with strict privacy settings.
- **Role-Based Access**: Uses Federated Identity where the SaaS Application creates the user context.
- **Short-Lived Tokens**: Initial handoff tokens expire in seconds to prevent replay attacks.

## Token Handoff Flow

```mermaid
sequenceDiagram
    autonumber
    participant Browser as End-User Browser
    participant SaaS_BE as SaaS Backend
    participant EEA_Next as EEA Next.js Server (UI)
    
    Note over Browser, SaaS_BE: User is already logged into SaaS App

    Browser->>SaaS_BE: 1. Request Agent Load
    SaaS_BE->>SaaS_BE: 2. Generate Signed JWT<br/>(User ID, Roles, Org ID)
    SaaS_BE-->>Browser: 3. Return JWT Token
    
    Browser->>EEA_Next: 4. Iframe Load request<br/>GET /agent?token=JWT
    
    EEA_Next->>EEA_Next: 5. Validate JWT Signature
    EEA_Next->>EEA_Next: 6. Create HttpOnly Session
    
    EEA_Next-->>Browser: 7. Render Agent UI + Set-Cookie
    
    Browser->>EEA_Next: 8. Subsequent API Calls (with Cookie)
    EEA_Next-->>Browser: 9. Agent Response
```

## Authorization Strategy
Permission to access specific agents is managed via **Scopes**:
1. **SaaS Role**: User has role `Finance_Manager` in SaaS App.
2. **Token Claim**: JWT includes `roles: ["Finance_Manager"]`.
3. **Agent Config**: "Finance Agent" requires scope `Finance_Manager`.
4. **Access Grant**: EEA-UI grants access based on the match.
