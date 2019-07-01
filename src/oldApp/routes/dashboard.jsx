import _ from 'lodash';

import Dashboard from 'views/Dashboard/Dashboard.jsx';
import MySitesPage from 'views/Pages/Console/MySitesPage.jsx';
import FeedsPage from 'views/Pages/Console/FeedsPage.jsx';
import ActivitySummaryPage from 'views/Pages/Console/ActivitySummaryPage.jsx';
import ExceptionMonitorPage from 'views/Pages/Console/ExceptionMonitorPage.jsx';
import RecipeMonitorPage from 'views/Pages/Console/RecipeMonitorPage.jsx';
import RecipesPage from 'views/Pages/Console/RecipesPage.jsx';
import DataSourcesPage from 'views/Pages/Console/DataSourcesPage.jsx';
import DataTargetsPage from 'views/Pages/Console/DataTargetsPage.jsx';
import DBTErrorMonitorPage from 'views/Pages/Console/DBTErrorMonitorPage.jsx';
import APIAuthPage from 'views/Pages/Console/APIAuthPage.jsx';
import BillingPage from 'views/Pages/Console/BillingPage.jsx';
import ActivateRecipesRoutes from './ActivateRecipesRoutes.jsx';
import AuthStoresRoutes from 'routes/AuthStoresRoutes.jsx';

// @material-ui/icons
import AttachMoney from '@material-ui/icons/AttachMoney';
import Kitchen from '@material-ui/icons/Kitchen';
import AddAlert from '@material-ui/icons/AddAlert';
import LocalDining from '@material-ui/icons/LocalDining';
import Fastfood from '@material-ui/icons/Fastfood';
import Build from '@material-ui/icons/Build';
import Timeline from '@material-ui/icons/Timeline';
import Lock from '@material-ui/icons/Lock';
import Forward from '@material-ui/icons/Forward';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Toc from '@material-ui/icons/Toc';
import DeveloperBoard from '@material-ui/icons/DeveloperBoard';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import ReportProblem from '@material-ui/icons/ReportProblem';

var dashRoutes = user => {
  const redirect = {
    redirect: true,
    path: '/dashboard',
    pathTo: '/dashboard/my-sites',
    name: 'My Sites'
  };
  const top = [
    {
      path: '/dashboard/overview',
      name: "Let's Eat!",
      icon: Fastfood,
      component: Dashboard
    }
  ];
  if (_.get(user, 'org.recipes.totalCount', 0) === 0) {
    // direct user to activate recipes
    redirect.pathTo = '/dashboard/activate-recipes';
    redirect.name = 'Activate Recipes';
  } else if (_.get(user, 'totalSites', 0) === 0) {
    redirect.pathTo = '/dashboard/recipes';
    redirect.name = 'Add a Site';
  }
  const authRequired = _.flatten(
    _.map(_.get(user, 'org.recipes.edges', []), 'node.authRequired')
  );
  if (authRequired.length > 0) {
    redirect.pathTo = '/dashboard/auth-required';
    redirect.name = 'Auth Required';
    top.push({
      path: '/dashboard/auth-required',
      name: 'Auth Required',
      icon: AddAlert,
      component: APIAuthPage
    });
  }
  return top.concat([
    {
      path: '/dashboard/admin/activity-summary',
      name: 'User Activity Summary',
      icon: Toc,
      superUserOnly: true,
      component: ActivitySummaryPage
    },
    {
      path: '/dashboard/admin/recipe-monitor/instances',
      name: 'Recipe Monitor',
      icon: DeveloperBoard,
      superUserOnly: true,
      component: RecipeMonitorPage
    },
    {
      path: '/dashboard/admin/exception-monitor',
      name: 'Exception Monitor',
      icon: ErrorOutline,
      superUserOnly: true,
      component: ExceptionMonitorPage
    },
    {
      path: '/dashboard/admin/dbt-error-monitor',
      name: 'DBT Error Monitor',
      icon: ReportProblem,
      superUserOnly: true,
      component: DBTErrorMonitorPage
    },
    {
      path: '/dashboard/auth-stores',
      name: 'Account Auth',
      icon: Lock,
      component: AuthStoresRoutes
    },
    {
      path: '/dashboard/admin/data-sources',
      name: 'Data Sources',
      icon: Forward,
      superUserOnly: true,
      component: DataSourcesPage
    },
    {
      path: '/dashboard/admin/data-targets',
      name: 'Data Targets',
      icon: SaveAlt,
      superUserOnly: true,
      component: DataTargetsPage
    },
    {
      path: '/dashboard/admin/feeds',
      name: 'Feeds',
      icon: Timeline,
      superUserOnly: true,
      component: FeedsPage
    },
    {
      icon: Build,
      path: '/dashboard/activate-recipes',
      name: 'Activate Recipes',
      component: ActivateRecipesRoutes
    },
    {
      icon: Kitchen,
      path: '/dashboard/recipes',
      name: 'Available Recipes',
      component: RecipesPage
    },
    {
      icon: LocalDining,
      path: '/dashboard/my-sites',
      name: 'My Sites',
      component: MySitesPage
    },
    {
      icon: AttachMoney,
      path: '/dashboard/billing',
      name: 'Billing',
      component: BillingPage
    },
    redirect
  ]);
};
export default dashRoutes;
