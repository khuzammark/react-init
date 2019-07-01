import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions
} from "@material-ui/core";
import Theme from "../theme";
import CTAButton from "../CTAButton";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    },
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  },
  card: {
    width: 250,
    margin: theme.spacing(2, 0)
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2)
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
}));

const PricingCard = ({
  price,
  link: { link, name },
  title,
  details,
  paymentTaken
}) => {
  const classes = useStyles(Theme);
  return (
    <Card className={classes.card}>
      <CardHeader
        title={title}
        titleTypographyProps={{ align: "center" }}
        className={classes.cardHeader}
      />
      <CardContent>
        <div className={classes.cardPricing}>
          <Typography component="h2" variant="h3" color="textPrimary">
            ${price}
          </Typography>
        </div>
        <ul>
          {details.map(line => (
            <Typography
              component="li"
              variant="subtitle1"
              align="center"
              key={line}
            >
              {line}
            </Typography>
          ))}
        </ul>
      </CardContent>
      <CardActions className={classes.actions}>
        <CTAButton
          link={paymentTaken ? "#" : link}
          name={name}
          color="primary"
          mini
        />
      </CardActions>
    </Card>
  );
};

PricingCard.propTypes = {
  price: PropTypes.number.isRequired,
  paymentTaken: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  details: PropTypes.arrayOf(PropTypes.string).isRequired,
  link: PropTypes.shape({
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default PricingCard;
