/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { Spring } from "react-spring/renderprops";
import Header from "./header";
import Archive from "./archive";
import "./layout.css";

const MainLayout = styled.main`
  max-width: 90%;
  margin: 20px auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 30px;
`;

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        file(relativePath: { regex: "/bg/" }) {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />

        <Spring
          from={{ height: location.pathname === "/" ? 200 : 300 }}
          to={{ height: location.pathname === "/" ? 300 : 200 }}
        >
          {styles => (
            <div style={{ overflow: "hidden", ...styles }}>
              <Img fluid={data.file.childImageSharp.fluid} />
            </div>
          )}
        </Spring>

        <MainLayout>
          <div>{children}</div>
          <Archive />
        </MainLayout>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
Layout.defaultProps = {
  location: {},
};

export default Layout;
