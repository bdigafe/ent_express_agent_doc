import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  base: '/enterprise-express-agent/',
  title: "Enterprise Express Agent",
  description: "Documentation for Enterprise Express Agent Architecture and Integration",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Architecture', link: '/architecture' }
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Architecture', link: '/architecture' },
          { text: 'Admin Portal', link: '/admin-portal' },
        ]
      },
      {
        text: 'Guides',
        items: [
          { text: 'Create Account', link: '/getting-started' },
          { text: 'Create Agent', link: '/create-agent' },
          { text: 'Create Connector', link: '/create-connector' }
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
