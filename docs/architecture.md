# Architecture

![Enterprise Agent Express Architecture](./assets/images/eea-architecture.png)

## Components

The Enterprise Express Agent (EEA) consists of several key components working together:

- **EEA-Backend**: [FastAPI](https://fastapi.tiangolo.com/), [AG-UI](https://docs.ag-ui.com/introduction), and [Google ADK](https://google.github.io/adk-docs) services.
- **EEA-UI**: React-based UI leveraging [CopilotKit AI](https://www.copilotkit.ai/).
- **EEA-SaaS Integration**: JavaScript SDK for IFrame integration.
- **Connectors**: MCP, functions, and APIs for SaaS data exchange.
- **LLM Models**: Integration with various LLM providers via LiteLLM.
