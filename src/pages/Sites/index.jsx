import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { orderBy, uniqBy } from "lodash";
import { compareAsc, compareDesc } from "date-fns";
import { withStyles } from "@material-ui/styles";
import { Hero, DropDown, CTAButton } from "../../ui-lib";
import Page from "../../layouts/Page";
import HeroData from "../../DummyData/hero";
import PaginatedTable from "../../components/PaginatedTable/index2";
import sitesData from "../../DummyData/sitesData";

const styles = theme => ({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignContent: "center",
    margin: theme.spacing(4, 0)
  },
  ddContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  },
  addSiteButton: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    }
  }
});

class SitesIndex extends Component {
  constructor(props) {
    super(props);

    const sites = this.initialSort(sitesData.sites);

    this.state = {
      sites,
      siteNames: uniqBy(sites, "site").map(({ site }) => site),
      recipeNames: uniqBy(sites, "recipe").map(({ recipe }) => recipe),
      filterBy: {
        siteFilter: [],
        recipeFilter: []
      }
    };
  }

  initialSort = sites => {
    return orderBy(
      orderBy(sites, [item => item.site.toLowerCase()], ["asc"]),
      [item => item.recipe.toLowerCase()],
      ["asc"]
    );
  };

  handleSelect = e => {
    const {
      state: { filterBy }
    } = this;
    if (e.target.name === "Recipes") {
      this.setState({
        filterBy: {
          ...filterBy,
          recipeFilter: e.target.value
        }
      });
    } else {
      this.setState({
        filterBy: {
          ...filterBy,
          siteFilter: e.target.value
        }
      });
    }
  };

  filterSites = sites => {
    const {
      state: {
        filterBy: { siteFilter, recipeFilter }
      }
    } = this;
    return sites.filter(({ site, recipe }) => {
      if (siteFilter.length && recipeFilter.length) {
        return siteFilter.includes(site) && recipeFilter.includes(recipe);
      }
      if (siteFilter.length) {
        return siteFilter.includes(site);
      }
      if (recipeFilter.length) {
        return recipeFilter.includes(recipe);
      }
      return true;
    });
  };

  sortAlphabetically = (list, property, down = false) => {
    this.setState({
      sites: orderBy(
        list,
        [item => item[property].toLowerCase()],
        [down ? "desc" : "asc"]
      )
    });
  };

  sortDate = (sites, down = false) => {
    this.setState({
      sites: sites.sort((a, b) =>
        down
          ? compareDesc(a.updated, b.updated)
          : compareAsc(a.updated, b.updated)
      )
    });
  };

  sortStatus = (sites, down = false) => {
    this.setState({
      sites: sites.sort((a, b) => {
        return down ? b.status - a.status : a.status - b.status;
      })
    });
  };

  render() {
    const {
      props: { classes, history },
      state: {
        sites,
        recipeNames,
        siteNames,
        filterBy: { siteFilter, recipeFilter }
      }
    } = this;
    const sets = [
      {
        name: "Recipes",
        data: recipeNames,
        selection: recipeFilter
      },
      {
        name: "Sites",
        data: siteNames,
        selection: siteFilter
      }
    ];
    const filtered = this.filterSites(sites);
    return (
      <Fragment>
        <Hero {...HeroData} classes={classes.none} />
        <div className={classes.ddContainer}>
          <DropDown handleSelect={this.handleSelect} sets={sets} row />
          <div className={classes.addSiteButton}>
            <CTAButton
              name="Add Site"
              link="/recipes"
              mini
              color="primary"
              className={null}
            />
          </div>
        </div>
        <PaginatedTable
          sites={filtered}
          sortAlphabetically={this.sortAlphabetically}
          sortDate={this.sortDate}
          sortStatus={this.sortStatus}
          history={history}
        />
      </Fragment>
    );
  }
}

SitesIndex.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  history: ReactRouterPropTypes.history.isRequired
};

export default Page(withStyles(styles)(SitesIndex));
