const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          totalCount
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `).then(results => {
      results.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.frontmatter.slug,
          component: path.resolve("./src/components/postLayout.js"),
          //data passed into the component:
          context: {
            slug: node.frontmatter.slug,
            //slug will be assessable within postLayout component
          },
        });
      });
      resolve();
    });
  });
};
