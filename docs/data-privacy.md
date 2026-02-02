# Data Privacy & Compliance

The Enterprise Express Agent (EEA) platform is architected with a "Privacy First" mindset. We understand that our customers trust us with sensitive enterprise data, and we adhere to strict protocols to ensure that data remains confidential, secure, and is never used for unauthorized purposes.

## AI Model Privacy (No Training Policy)

A core concern for any enterprise adopting AI is the risk of data leakage into public models. EEA strictly enforces a **Zero-Training Policy**:

- **Foundation Models**: We utilize Enterprise-tier integrations with LLM providers (Google Gemini, OpenAI Enterprise, Azure OpenAI).
- **Data Isolation**: Your prompts, uploaded documents, tool outputs, and agent responses **are not used to train, retrain, or fine-tune** the foundation models.
- **Stateless Inference**: Data sent to the LLM is used solely for the purpose of generating a response for that specific request and is not retained by the model provider to improve their services.

> **Verification**: Customers can verify these commitments in the [Google Cloud Generative AI Privacy Terms](https://cloud.google.com/vertex-ai/generative-ai/docs/data-governance) and equivalent Enterprise agreements from other providers.

## Sensitive Data Protection

### Secrets Management
EEA manages sensitive credentials (such as SaaS API keys, OAuth Client Secrets, and Database connection strings) using industry-standard **Envelope Encryption**:

1.  **Encryption at Rest**: All sensitive fields in the database are encrypted using AES-256-GCM.
2.  **Key Management**: The Master Encryption Key (KEK) is managed by a dedicated Cloud Key Management Service (AWS KMS, Google Cloud KMS, or Azure Key Vault).
3.  **Isolation**: The EEA application code never stores keys in plain text logs or source control. Decryption occurs only in memory at the exact moment the Agent needs to invoke a Connector.

### Data Retention & Observability

To maintain system reliability and troubleshoot complex agent behaviors, we utilize observability tools (Arize Phoenix).

- **Purpose**: Interaction data (Prompts, Tool Outputs) is stored strictly for **Performance Monitoring**, **Cost Analysis**, and **Debugging**.
- **Retention Policy**:
    - **Operational Traces**: Retained for **30 days** to allow for immediate troubleshooting.
    - **Metrics**: Aggregated metrics (token counts, latency) are retained for 1 year but contain no PII (Personally Identifiable Information).
- **Access Control**: Access to raw trace data is restricted to authorized DevOps personnel via Audit-logged access requests.

### User Data Persistence

Long-term user history (Threads and Runs) stored in our database serves the user's continuity across sessions.

- **Ownership**: This data belongs to the Customer.
- **Deletion**: We provide APIs for "Right to be Forgotten" requests, allowing the programmable deletion of specific User Threads or entire Workspaces upon request.
