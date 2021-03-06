/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image, { FixedObject } from "gatsby-image"
import { Grid, Typography } from "@material-ui/core"
import { BioQuery, BioQuery_site_siteMetadata } from "./__generated__/BioQuery"

const Bio: React.FC = () => {
  const data = useStaticQuery<BioQuery>(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)

  const { author }: BioQuery_site_siteMetadata = data.site!.siteMetadata!
  const { name, summary } = author!
  const fixed = data.avatar!.childImageSharp!.fixed! as FixedObject
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <Link to={"/about"}>
          <Image
            fixed={fixed}
            alt={name!}
            style={{
              marginBottom: 0,
              minWidth: 50,
              borderRadius: `100%`,
            }}
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
        </Link>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">
          Written by <strong>{name}</strong>. {summary}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Bio
