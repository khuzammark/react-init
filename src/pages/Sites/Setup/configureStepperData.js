export default state => {
    const { siteName, siteDomain, sources, targets, activeStep } = state;
    const steps = [
        {
            label: 'Site Details',
            links: [
                {
                    fieldName: 'Name',
                    value: siteName
                },
                {
                    fieldName: 'Domain',
                    link: siteDomain,
                    value: ''
                }
            ]
        },
        {
            label: 'Select Accounts',
            links: sources.map(({ name, selection }) => {
                return { fieldName: name, link: selection.join(' ') };
            })
        },
        {
            label: 'Select BigQuery Project',
            links: targets.map(({ name, selection }) => {
                return { fieldName: name, value: selection.join(' ') };
            })
        },
        {
            label: 'Confirm setup',
            links: []
        }
    ];
    return {
        activeStep,
        steps
    };
};
