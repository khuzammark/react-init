import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

const themeProvider = App => {
    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <App />
        </ThemeProvider>
    );
};

export default themeProvider;
