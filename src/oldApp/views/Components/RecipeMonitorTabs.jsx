import React from "react";
import Timeline from "@material-ui/icons/Timeline";
import LinearScale from "@material-ui/icons/LinearScale";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import RecipeInstanceDbtRunsTable from "views/Tables/RecipeInstanceDbtRunsTable";
import RecipeInstancesFeedDetailsTable from "views/Tables/RecipeInstanceFeedDetailsTable.jsx";

const Tabs = props => (
  <CustomTabs
    title="Feed Details"
    headerColor="rose"
    tabs={[
      {
        tabName: "Feeds",
        tabIcon: Timeline,
        tabContent: <RecipeInstancesFeedDetailsTable {...props} />
      },
      {
        tabName: "DBT Runs",
        tabIcon: LinearScale,
        tabContent: <RecipeInstanceDbtRunsTable {...props} />
      }
    ]}
  />
);

export default Tabs;
