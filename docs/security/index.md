# Security Architecture

Security in the Enterprise Express Agent (EEA) is built on a "Defense in Depth" strategy, ensuring robust protection across all layers of the platform.

We segregate security concerns into three distinct domains:

1.  [**Admin Portal Security**](./admin-security): Protecting the control plane where agents and integrations are configured.
2.  [**Connector Security**](./connector-security): Securing the communication pipeline between agents and external SaaS APIs.
3.  [**End-User Authentication**](./end-user-security): Managing secure access for end-users interacting with agents embedded within SaaS applications.
