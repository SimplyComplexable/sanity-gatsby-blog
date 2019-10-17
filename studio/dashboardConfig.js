export default {
  widgets: [
    {name: 'structure-menu'},
    {
      name: 'netlify',
      options: {
        description:
          'Click deploy to see your changes on the front-end',
        sites: [
          {
            buildHookId: '5da7bf8dc503f5ef36c0f229',
            title: 'Sympllyph',
            name: 'sanity-gatsby-blog-web-rx8cbkwe',
            apiId: '5f95a39b-874b-4fda-a96a-fe63a064491c'
          }
        ]
      }
    },
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'large'}
    }
  ]
}
