import React from "react"
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core"
import FiberNewIcon from "@material-ui/icons/FiberNew"
import { isNewPost } from "../../utils/common"
import { Link } from "gatsby"
import { IndexPageQuery_allMarkdownRemark_edges_node } from "../../pages/__generated__/IndexPageQuery"

const useStyles = makeStyles(_ => ({
  card: {
    border: "1px solid",
  },
  actions: {
    float: "right",
  },
  link: {
    color: "inherit",
  },
}))

interface ChildProps {
  node: IndexPageQuery_allMarkdownRemark_edges_node
}

const Post: React.FC<ChildProps> = ({ node }) => {
  const classes = useStyles()
  const { frontmatter, fields } = node
  let { title, date, description } = frontmatter!
  if (!title) {
    title = fields!.slug
  }
  if (!description) {
    description = node.excerpt!
  }
  const href = fields!.slug
  const random = Math.random()
  const isInverse = random <= 0.6
  let style: React.CSSProperties = {}
  if (isInverse) {
    switch (Math.ceil(random * 10)) {
      case 1:
        style.borderColor = "coral"
        break
      case 2:
        style.borderColor = "orange"
        break
      case 3:
        style.borderColor = "beige"
        break
      case 4:
        style.borderColor = "limegreen"
        break
      case 5:
        style.borderColor = "cornflowerblue"
        break
      case 6:
        style.borderColor = "skyblue"
        break
      case 7:
        style.borderColor = "purple"
        break
      case 8:
        style.borderColor = "magenta"
        break
      case 9:
        style.borderColor = "pink"
        break
      case 10:
        style.borderColor = "wheat"
        break
      default:
    }
  }
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card} style={style}>
        <CardContent>
          <Typography variant="h5" component="h2">
            <Link to={href!} className={classes.link}>
              {title}
            </Link>
          </Typography>
          <Typography color="textSecondary">{date}</Typography>
          <Typography
            variant="body2"
            component="p"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
            itemProp="description"
          ></Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          {isNewPost(date) && <FiberNewIcon />}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Post
