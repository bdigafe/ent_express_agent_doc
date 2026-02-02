import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  // Dynamically set base path for GitHub Pages deployment
  base: process.env.VITEPRESS_BASE || '/',
  title: "Enterprise Express Agent",
  description: "Documentation for Enterprise Express Agent Architecture and Integration",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Architecture', link: '/architecture' },
      { text: 'Security', link: '/security/' }
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Architecture', link: '/architecture' },
        ]
      },
      {
        text: 'Platform',
        items: [
          { text: 'Admin Portal', link: '/platform/admin-portal' },
          { text: 'Monitoring', link: '/platform/monitoring' },
          { text: 'Data Privacy', link: '/platform/data-privacy' },
          { text: 'Deployment', link: '/platform/deployment' },
        ]
      },
      {
        text: 'Security',
        items: [
            { text: 'Overview', link: '/security/' },
            { text: 'Admin Portal', link: '/security/admin-security' },
            { text: 'Connectors', link: '/security/connector-security' },
            { text: 'End-User Auth', link: '/security/end-user-security' }
        ]
      },
      {
        text: 'Guides',
        items: [
          { text: 'Create Account', link: '/guides/create-account' },
          { text: 'Create Agent', link: '/guides/create-agent' },
          { text: 'Create Connector', link: '/guides/create-connector' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bdigafe/enterprise-express-agent' }
    ]
  },
  mermaid: {
    // mermaid config
  }
}))
