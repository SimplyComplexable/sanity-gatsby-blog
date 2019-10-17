export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-blog'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5da7bf8df0b774e56e4851e1',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-blog-studio-26zrzkpc',
                  apiId: '8ca669d0-337e-4509-97c8-714561c8a155'
                },
                {
                  buildHookId: '5da7bf8dc503f5ef36c0f229',
                  title: 'Blog Website',
                  name: 'sanity-gatsby-blog-web-rx8cbkwe',
                  apiId: '5f95a39b-874b-4fda-a96a-fe63a064491c'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/SimplyComplexable/sanity-gatsby-blog',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-gatsby-blog-web-rx8cbkwe.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
