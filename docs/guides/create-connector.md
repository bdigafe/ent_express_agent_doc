# Create a Connector

Connectors allow your agents to talk to external APIs.

## REST API Connector (API Key)

1. Navigate to the **Connectors** section.
2. Click **Add Connector**.
3. Provide the basic information:
    - **Name**: `Stripe API`
    - **Description**: `Connector for payment processing.`
4. **OpenAPI Specification**:
    - Upload your `openapi.json` or `swagger.yaml` file.
    - Or provide a URL to the spec.
5. **Authentication**:
    - Type: Select `API Key`.
    - Key Name: `Authorization`
    - Location: `Header`
6. Click **Save Connector**.

## Connector Mockup

> ![Create Connector Form](../assets/images/eea_create_connector.png)
