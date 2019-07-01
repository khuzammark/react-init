export default {
  activeStep: 2,
  steps: [
    {
      label: "Site Details",
      links: [
        {
          fieldName: "Name",
          value: "Coding Is For Losers"
        },
        {
          fieldName: "Domain",
          link: "codingisforlosers.com",
          value: ""
        }
      ]
    },
    {
      label: "Select Accounts",
      links: [
        {
          fieldName: "Google Analytics",
          value: "CIFL"
        },
        {
          fieldName: "Google Search Console",
          link: "https://codingisforlosers.com/",
          value: ""
        },
        {
          fieldName: "Deepcrawl",
          value: "Account included in QR Subscription"
        },
        {
          fieldName: "SEMRush",
          value: "Account included in QR Subscription"
        }
      ]
    },
    {
      label: "Select BigQuery Project",
      links: [
        {
          fieldName: "BigQuery Project ID",
          value: "Account included in QR Subscription"
        }
      ]
    },
    {
      label: "Confirm setup",
      links: [
        {
          fieldName: "Confirm",
          link: "confirmationlink.com"
        }
      ]
    }
  ]
};
