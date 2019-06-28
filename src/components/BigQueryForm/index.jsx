import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core/';
import { DropDown } from '../../ui-lib';

const BigQueryForm = ({ handleSelect, sources }) => {
    return (
        <Fragment>
            <Typography variant="h6" gutterbottom="true" align="center">
                Select Targets
            </Typography>
            <DropDown sets={sources} handleSelect={handleSelect} single />
        </Fragment>
    );
};

BigQueryForm.propTypes = {
    handleSelect: PropTypes.func.isRequired,
    sources: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default BigQueryForm;
