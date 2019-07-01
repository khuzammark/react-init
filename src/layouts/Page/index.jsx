import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { isEmpty } from "lodash";
import { UserConsumer } from "../../contexts/UserContext";
import { Header, Footer, mainTheme } from "../../ui-lib";
import HeaderData from "../../DummyData/header";
import FooterData from "../../DummyData/footer";
import "./styles.scss";

const useStyles = makeStyles(theme => ({
  box: {
    padding: theme.spacing(8, 0, 0, 0),
    display: "flex",
    flexDirection: "column",
    alignContent: "center"
  },
  footerWrapper: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  }
}));

const defaultOptions = {
  showLinks: true
};

export default (Component, options) => {
  const PageLayout = props => {
    const classes = useStyles(mainTheme);
    const { showLinks } = options || defaultOptions;
    return (
      <Box height={1} className={classes.box}>
        <UserConsumer>
          {user => {
            console.log("the user in laout is ", user);
            return (
              <Fragment>
                <Header
                  {...{
                    ...HeaderData,
                    ...props,
                    showLinks,
                    authenticated: !isEmpty(user)
                  }}
                />
                <Container maxWidth="xl">
                  <Component {...{ ...props, user }} />
                </Container>
                <div className={classes.footerWrapper}>
                  <Footer {...{ ...FooterData, ...props, user }} />
                </div>
              </Fragment>
            );
          }}
        </UserConsumer>
      </Box>
    );
  };

  PageLayout.propTypes = {
    authenticated: PropTypes.bool.isRequired
  };

  return PageLayout;
};
