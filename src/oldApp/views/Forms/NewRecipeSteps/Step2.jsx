import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class Step2 extends React.Component {
  state = {
    simpleSelect: "",
    googleAnalytics: false,
    googleSearchConsole: false,
    GoogleAdsAdPerformanceReport: false,
    GoogleAdsCampaignPerformanceReport: false,
    GoogleAdsFinalUrlReport: false,
    semrush: false,
    majestic: false,
    deepcrawl: false,
    shopifyCustomers: false,
    shopifyProducts: false,
    shopifyOrders: false,
    shopifyRefunds: false,
    facebookAds: false,
    facebookAdCreatives: false,
    facebookAdInsights: false,
    adobeAnalytics: false
  };
  sendState = () => this.state;
  isValidated = () => true;
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h4 className={classes.infoText}>
          Which data sources does are you cooking with?
        </h4>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("googleAnalytics")}
                    checkedIcon={
                      <i
                        className={"fas fa-table " + classes.iconCheckboxIcon}
                      />
                    }
                    icon={
                      <i
                        className={"fas fa-table " + classes.iconCheckboxIcon}
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Google Analytics</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("googleSearchConsole")}
                    checkedIcon={
                      <i
                        className={"fas fa-list " + classes.iconCheckboxIcon}
                      />
                    }
                    icon={
                      <i
                        className={"fas fa-list " + classes.iconCheckboxIcon}
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Search Console</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("GoogleAdsAdPerformanceReport")}
                    checkedIcon={
                      <i
                        className={"fab fa-google " + classes.iconCheckboxIcon}
                      />
                    }
                    icon={
                      <i
                        className={"fab fa-google " + classes.iconCheckboxIcon}
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Google Adwords Ad Performance Report</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange(
                      "GoogleAdsCampaignPerformanceReport"
                    )}
                    checkedIcon={
                      <i
                        className={"fab fa-google " + classes.iconCheckboxIcon}
                      />
                    }
                    icon={
                      <i
                        className={"fab fa-google " + classes.iconCheckboxIcon}
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Google Adwords Campaign Performance Report</h6>
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("GoogleAdsFinalUrlReport")}
                    checkedIcon={
                      <i
                        className={"fab fa-google " + classes.iconCheckboxIcon}
                      />
                    }
                    icon={
                      <i
                        className={"fab fa-google " + classes.iconCheckboxIcon}
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Google Adwords Final Url Report</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("semrush")}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-download " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-download " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>SEMrush</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("majestic")}
                    checkedIcon={
                      <i
                        className={"fas fa-link " + classes.iconCheckboxIcon}
                      />
                    }
                    icon={
                      <i
                        className={"fas fa-link " + classes.iconCheckboxIcon}
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Majestic</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("deepcrawl")}
                    checkedIcon={
                      <i
                        className={"fas fa-file " + classes.iconCheckboxIcon}
                      />
                    }
                    icon={
                      <i
                        className={"fas fa-file " + classes.iconCheckboxIcon}
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Deepcrawl</h6>
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridItem xs={12} sm={3}>
              <div className={classes.choiche}>
                <Checkbox
                  tabIndex={-1}
                  onClick={this.handleChange("googleAnalytics")}
                  checkedIcon={
                    <i className={"fas fa-table " + classes.iconCheckboxIcon} />
                  }
                  icon={
                    <i className={"fas fa-table " + classes.iconCheckboxIcon} />
                  }
                  classes={{
                    checked: classes.iconCheckboxChecked,
                    root: classes.iconCheckbox
                  }}
                />
                <h6>Google Analytics</h6>
              </div>
            </GridItem>{" "}
            <GridContainer>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("shopifyCustomers")}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-shopping-cart " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-shopping-cart " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Shopify Customers</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("shopifyProducts")}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-shopping-cart " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-shopping-cart " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Shopify Products</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("shopifyOrders")}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-shopping-cart " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-shopping-cart " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Shopify Orders</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("shopifyRefunds")}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-shopping-cart " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-shopping-cart " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Shopify Refunds</h6>
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("facebookAds")}
                    checkedIcon={
                      <i
                        className={
                          "fab fa-facebook-f " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fab fa-facebook-f " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Facebook Ads</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("facebookAdCreatives")}
                    checkedIcon={
                      <i
                        className={
                          "fab fa-facebook-f " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fab fa-facebook-f " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Facebook Ad Creatives</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("facebookAdInsights")}
                    checkedIcon={
                      <i
                        className={
                          "fab fa-facebook-f " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fab fa-facebook-f " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Facebook Ad Insights</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("adobeAnalytics")}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-chart-line " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-chart-line " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Adobe Analytics</h6>
                </div>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step2);
