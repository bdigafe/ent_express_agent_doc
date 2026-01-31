# GitHub Copilot Instructions

This file guides GitHub Copilot on how to assist with this project.

## Tech Stack
- **Framework**: [VitePress](https://vitepress.dev/) (Vue-based Static Site Generator).
- **Language**: Markdown for content, JavaScript/Vue for customization.
- **Styling**: Standard CSS / VitePress Default Theme customization.
- **Deployment**: GitHub Pages.

## Project Conventions
- **Code Style**: 
  - Use **Markdown** for documentation pages.
  - Follow Vue.js conventions for any custom components.
- **Project Structure**: 
  - `docs/`: Root directory for documentation content.
  - `docs/.vitepress/`: Configuration and theme files.
  - `docs/.vitepress/config.mts`: Main configuration file.
  - `docs/index.md`: Landing page.
- **Naming Conventions**: 
  - Documentation files: `kebab-case.md` (e.g., `agent-orchestration.md`).
  - Vue components: `PascalCase.vue`.

## Project Description

  ### Overview
    
  **Why it is needed** : Describe the need for an Enterprise Express Agent that integrates LLMs and agentic capabilities into SaaS applications to enhance user productivity and streamline business processes.
    
  **Who will benefit from it**. SaaS providers looking to enhance their applications with AI-driven agents, and enterprises seeking to improve user experience and operational efficiency. We target mid to large size enterprises across various industries such as CRM, ERP, Marketing Automation, Customer Support, etc. We focus on automating repetitive tasks, providing in SaaS application leveraging their Open APIs, and enhancing user interactions through intelligent agents.
    
  **How**: We use Google ADK, FastAPI, and CopilotKit.AI to build a solution that allows seamless integration of agents into SaaS platforms via an embeddable UI component. We also support New protocols: MCP, A2A, AG-UI.

  ### Architecture

  The Enterprise Express Agent (EEA) architecture consists of the following key components:

   **Enterprise Express Agent Backend (EEA-Backend)**: The backend services that manage agent configurations, orchestrate agent executions, and handle interactions with SaaS applications. Built using FastAPI and Google ADK.

   **Enterprise Express Agent User Interface (EEA-UI)**: A React-based web application that provides a user-friendly interface for interacting with agents. It leverages CopilotKit.AI to implement the AG-UI protocol for seamless agent communication.

   **EEA-SaaS Integration**: A JavaScript SDK that facilitates the integration of the EEA-UI within SaaS applications via an IFrame, enabling contextual agent interactions.

   **Connectors**: A set of connectors/APIs that enable agents to interact with various SaaS applications. These connectors handle data formats, authentication methods, and supported operations for each SaaS platform.   

   **LLM Models**: Integration with various Large Language Models (LLMs) to power the agent's natural language understanding and generation capabilities. Support for multiple LLM providers to cater to different enterprise needs.

 ### Backend features
  **Account Administration**: 
    - Allows enterprise registrations, its users, and their roles. 
    - Enterprise accounts are defined with unique name, domain, subscription plan, and usage limits. 
    - An enterprise can have one or more teams or workspaces. Each workspace is intended to define a SaaS application context (e.g., CRM, ERP, Marketing Automation). 
    - An enterprise admin can create and manage multiple workspaces under their enterprise account.
    - User roles include: Enterprise Admin, Workspace Admin, and Standard User.
    - All enterprises have at least one Enterprise admin user.
    - User authentication is based OAuth2.
    - We will use Auth0 as the identity provider for managing user authentication and authorization.
    - We enable Google SSO for seamless access.
    - An enterprise admin can manage users within their organization, including inviting new users, assigning roles, and deactivating accounts.
    - Workspace admins can manage users within their specific workspaces.
    - EnterpriseAdmins can view list of active agents in any workspace, monitor agent activities, and configure settings (e.g. rate limits, usage, etc.).
    - Workspace Admins can view and manage agents within their specific workspaces.

  **Agent Administration**:
    - An admin portal for creating and configuring agents tailored to specific SaaS applications and business processes. Eg. CRM Assistant, Event Agent, Marketing Assistant Agent, etc. 
    - Agents are always associated to a workspace.
    - Agents can have one more tools: OpenAPI, MCP, Agent, Human Action, Webhook, built-in tools, etc.
    - Agents can be configured to use different LLM model.
    - Agents can be assigned specific connectors/APIs to interact with the target SaaS applications.
    - Connectors define how agents communicate with SaaS platforms, including data formats, authentication methods, and supported operations.
    - We leverage the Google ADK framework for agent creation and management.
    - The admin portal relies on FastAPI for backend services to handle agent configurations, storage, and retrieval, which in turn interact with Google ADK for agent operations. 
    - We also wrap Google ADK Agents with AG-UI to support the Agent to UI protocol. We use CopilotKit.AI as the base framework to implement AG-UI protocol.

  **Agent Definition**: Each agent is defined by:
      - Name
      - Description
      - Capabilities and behaviors
      - Assigned connectors/APIs

  **Agent Orchestration**:
    - Agents are executed from the Enterprise Express Agent User Interface layer (EEA-UI) to perform tasks within the context of the connected SaaS applications.
    - The EEA-UI passes a POST request to the Agent Orchestration layer to trigger agent execution with necessary parameters (e.g., agent ID, input data, etc.).
    - The Agent Orchestration layer handles the request, manages agent lifecycles, and coordinates interactions between agents and the connected SaaS applications via the Connectors Layer.
    - The Agent Orchestration layer ensures that agents operate within the defined constraints and policies set by the enterprise admins.
    - The Agent Orchestration layer is built using FastAPI and Google ADK to provide a robust and scalable backend service for managing agent executions.
    - The Agent Orchestration layer consists of the following components:
    - EEA-UI and EEA-Backend interaction: The EEA-UI communicates with the Agent Orchestration layer via RESTful APIs to initiate agent executions and retrieve results. We use SSE (Server-Sent Events) to stream real-time updates from the backend to the UI during agent execution. These events are based on the AG-UI protocol to ensure compatibility with the agentic framework.

  **EEA-UI and SaaS Application Interaction**
      
    The EEA-UI provides an IFrame to embed the agentic capabilities directly within the target SaaS applications. This allows users to interact with agents seamlessly while working within their familiar SaaS environments. 

      - The SaaS application loads the EEA-UI within the IFrame, enabling users to access agentic capabilities without leaving the SaaS platform while providing contextual information of their current form/page/data. 

      - This integration will require a collaboration with the SaaS providers to allow embedding of the EEA-UI within their applications. 

      - A JavaScript SDK (**EEA-SaaS**) is provided to facilitate the integration between the SaaS application and the EEA-UI. This SDK handles the communication, data exchange, and event handling between the two components.

  - **Key considerations for the EEA-SaaS integration**
    - **Which agent to load based on the SaaS application context?**
      - The SaaS application may define configuration settings to map specific agents to different pages, user roles, or data contexts within the application.

    - **How to determine the organization and workspace of the context**?
      - This can be achieved by having the EEA-SaaS application provide an organization/workspace identifier when initializing the EEA-UI within the IFrame. 

      - These values can be passed as part of the EEA-UI initialization parameters using the JavaScript SDK. The SaaS backend can sign these values to ensure authenticity. The EEA-UI can verify the signature to confirm the organization/workspace context.

    - **How to authenticate the end user?**
      - The EEA-SaaS users are the end-users of the SaaS applications who will interact with the agents via the EEA-UI. 

      - End-users may need to be authenticated because all agent actions are performed on behalf of an end-user.           

      - Most users are required to login to the SaaS application using their credentials. Some use case are for public users (e.g., ecommerce site).
    
      - Each agent can be configured to require user authentication via specific identity provider, eg. Azure Entra ID. This is defined when creating the agent in the admin portal.
      
      - The EEA-UI must facilitate the user authentication process to ensure that the agent actions are performed within the context of the authenticated user. 
        - Some agents may allow anonymous access depending on the use case in that case no user authentication is required. 

        - Some agent may leverage the existing authentication session of the SaaS application if the identity provider is the same as that defined for the agent. To prevent reply attack, the EEA-UI will still require the user to sign-in but the process will be streamlined using SSO capabilities of the identity provider.
        
        - Still some other agents may require authentication with a different identity provider than the SaaS application, which again is facilitated by the EEA-SaaS.

        - The EEA-UI will keep a session to manage authentication tokens for the authenticated user to perform agent actions without requiring repeated sign-in.

  ### Frontend Features
  The Enterprise Express Agent User Interface (EEA-UI) is a React-based web application that provides a user-friendly interface for interacting with agents. It leverages CopilotKit.AI to implement the AG-UI protocol for seamless agent communication.

  - **EEA-SaaS and EEA-UI Communication**:
    - The SaaS and the EEA-UI communicate via postMessage API to exchange data and commands. 
    - The EEA-UI handles user inputs, send requests to the backend, displays agent responses, and manages the overall user experience within the SaaS application context.

  - **Enterprise Express Agent User Interface (EEA-UI)**:
    - The EEA-UI will be a react-based web application that provides a user-friendly interface for interacting with agents. It will leverage CopilotKit.AI to implement the AG-UI protocol for seamless agent communication.

    - The EEA-UI may include Frontend tools that can be combined with backend tools to enhance agent capabilities. Refer to https://docs.ag-ui.com/concepts/tools for more details on frontend tools.

    - Examples of frontend tools include:
      - User Input Tool: Allows agents to request additional information or clarification from users during interactions.

      - Data Visualization Tool: Enables agents to present data in graphical formats (charts, graphs, etc.) for better understanding.

      - Form Filling Tool: Assists agents in populating forms within the SaaS application based on user inputs or agent decisions.

## Workflow
- **Development**: Run `npm run docs:dev` to see changes live.
- **Build**: Run `npm run docs:build` to generate static files in `docs/.vitepress/dist`.
- **Preview**: Run `npm run docs:preview` to preview the build locally.
- **Deploy**: Deploy the website to GitHub Pages at https://bdigafe.github.io/enterprise-express-agent

## AI Context
- When generating code, prefer modern syntax and patterns used in VitePress projects.
- Ask clarifying questions if requirements are ambiguous.
- Focus on creating clean markdown content and valid Vue syntax where needed.
- Since this is a documentation website, prioritize readability and user experience.
- Ensure the website is mobile-friendly and performs well across different devices and browsers.
- Some concepts require visual diagrams. Suggest appropriate diagrams where necessary.
- When suggesting content for the overview and architecture pages, ensure technical accuracy and clarity.
- Use **Mermaid.js** code blocks within markdown to visual diagrams and flowcharts (VitePress supports this via plugins like `vitepress-plugin-mermaid`). 
