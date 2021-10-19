const leadDetailsHash = [
  {
    heading: 'Contact Information',
    leadData: [
      [
        {
          title: 'Follow-up Instructions',
          key: 'followUpNotes'
        },
        {
          title: 'Company Name',
          key: 'company'
        },
        {
          title: 'Contact Name',
          key: 'contactName'
        },
        {
          title: 'Job Title',
          key: 'jobTitle'
        },
        {
          title: 'Office',
          key: 'phone'
        },
        {
          title: "Contact's Timezone",
          key: 'timezone'
        },
        {
          title: 'Email',
          key: 'email'
        }
      ],
      [
        {
          title: 'Website',
          key: 'website'
        },
        {
          title: 'Address',
          key: 'address'
        },
        {
          title: 'City',
          key: 'city'
        },
        {
          title: 'State',
          key: 'state'
        },
        {
          title: 'Zip Code',
          key: 'zip'
        },
        {
          title: 'Country',
          key: 'country'
        },
        {
          title: 'Timestamp',
          key: 'timestamp',
          toolTip: true,
          toolTipKey: 'notes'
        }
      ]
    ]
  },
  {
    heading: 'Company Profile',
    leadData: [
      [
        {
          title: 'Industry',
          key: 'industry'
        },
        {
          title: 'Segment',
          key: 'segment'
        },
        {
          title: 'Number of Employees',
          nested: true,
          getNestedValue: profile =>
            profile && profile.sizeTypes && profile.sizeTypes['Number of Employees']
        }
      ],
      [
        {
          title: 'Annual Revenue',
          nested: true,
          getNestedValue: profile =>
            profile && profile.sizeTypes && profile.sizeTypes['Size (Annual Revenue)']
        },
        {
          title: 'Number of Users',
          nested: true,
          getNestedValue: profile =>
            profile && profile.sizeTypes && profile.sizeTypes['Number of Users']
        }
      ]
    ]
  },
  {
    heading: 'Project & Requirements Overview',
    leadData: [
      [
        {
          title: 'Applications Needed',
          key: 'applications'
        },
        {
          title: 'Key Features Needed',
          key: 'keyFeaturesNeeded'
        },
        {
          title: 'Deployment',
          key: 'deployment'
        },
        {
          title: 'Currently Using',
          key: 'currentlyUsing'
        }
      ],
      [
        {
          title: 'Reasons for Shopping',
          key: 'reasonsForShopping'
        },
        {
          title: "Who They've Evaluated",
          key: 'whoEvaluated'
        },
        {
          title: 'Price Expectations',
          key: 'priceExpectations'
        },
        {
          title: 'Timeframe',
          key: 'timeframe'
        }
      ]
    ]
  },
  {
    heading: 'Next Steps',
    leadData: [
      [
        {
          title: 'Request',
          key: 'request'
        },
        {
          title: 'Contact Notes',
          key: 'contactNotes'
        }
      ],
      [
        {
          title: 'Product',
          key: 'product'
        },
        {
          title: 'Qualified By',
          key: 'qualifiedBy'
        }
      ]
    ]
  }
];

export default leadDetailsHash;
