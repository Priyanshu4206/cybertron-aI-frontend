// Onboarding static data for all steps

export const onboardingQuestions = [
  {
    label: 'What Do You Do ?',
    name: 'whatDoYouDo',
    placeholder: 'Ex- freelancer or youtuber',
    type: 'select',
    options: [
      '',
      'Freelancer',
      'Youtuber',
      'Agency',
      'Company',
      'Student',
      'Other',
    ],
  },
  {
    label: 'Discribe What Do You Do ?',
    name: 'describe',
    placeholder: 'Ex- im a youtuber and i make content etc',
    type: 'input',
  },
  {
    label: 'Pourpose To Open Account ?',
    name: 'purpose',
    placeholder: 'Ex- freelancing, agency work, Self work, clinet work, compney',
    type: 'select',
    options: [
      '',
      'Freelancing',
      'Agency work',
      'Self work',
      'Client work',
      'Company',
      'Other',
    ],
  },
  {
    label: 'Who You Are ?',
    name: 'whoYouAre',
    placeholder: 'Ex- agney, compney, indivisual.',
    type: 'select',
    options: [
      '',
      'Agency',
      'Company',
      'Individual',
      'Other',
    ],
  },
];

export const accountTypes = [
  {
    id: 'individual',
    title: 'Indivisual Account',
    features: [
      'You Can Mange Only One Account',
      'All Fetures Excess',
      'All Premium Features',
      'Full Support 24X7 On Call',
      'All Fetures Excess',
    ],
  },
  {
    id: 'agency',
    title: 'Agency Account',
    features: [
      'You Can Mange Only One Account',
      'All Fetures Excess',
      'All Premium Features',
      'Full Support 24X7 On Call',
      'All Fetures Excess',
    ],
  },
  {
    id: 'company',
    title: 'Compney Account',
    features: [
      'You Can Mange Only One Account',
      'All Fetures Excess',
      'All Premium Features',
      'Full Support 24X7 On Call',
      'All Fetures Excess',
    ],
  },
];

export const planTabs = [
  { id: 'individual', label: 'Indivisual plans' },
  { id: 'agency', label: 'Agency plans' },
  { id: 'company', label: 'Compney plans' },
];

export const plansData = {
  individual: [
    {
      id: 'starter',
      title: 'Starter Plan',
      features: [
        'You Can Mange Only One Account',
        'All Fetures Excess',
        'All Premium Features',
        'Full Support 24X7 On Call',
        'All Fetures Excess',
      ],
      price: { monthly: 299, yearly: 599, old: 2999 },
    },
  ],
  agency: [
    {
      id: 'starter',
      title: 'Starter Plan',
      features: [
        'You Can Mange Only One Account',
        'All Fetures Excess',
        'All Premium Features',
        'Full Support 24X7 On Call',
        'All Fetures Excess',
      ],
      price: { monthly: 299, yearly: 599, old: 2999 },
    },
    {
      id: 'business',
      title: 'Business Plan',
      features: [
        'You Can Mange Only One Account',
        'All Fetures Excess',
        'All Premium Features',
        'Full Support 24X7 On Call',
        'All Fetures Excess',
      ],
      price: { monthly: 299, yearly: 599, old: 2999 },
    },
    {
      id: 'enterprise',
      title: 'Enterprises Plan',
      features: [
        'You Can Mange Only One Account',
        'All Fetures Excess',
        'All Premium Features',
        'Full Support 24X7 On Call',
        'All Fetures Excess',
      ],
      price: { monthly: 299, yearly: 599, old: 2999 },
    },
  ],
  company: [
    {
      id: 'starter',
      title: 'Starter Plan',
      features: [
        'You Can Mange Only One Account',
        'All Fetures Excess',
        'All Premium Features',
        'Full Support 24X7 On Call',
        'All Fetures Excess',
      ],
      price: { monthly: 299, yearly: 599, old: 2999 },
    },
    {
      id: 'business',
      title: 'Business Plan',
      features: [
        'You Can Mange Only One Account',
        'All Fetures Excess',
        'All Premium Features',
        'Full Support 24X7 On Call',
        'All Fetures Excess',
      ],
      price: { monthly: 299, yearly: 599, old: 2999 },
    },
    {
      id: 'enterprise',
      title: 'Enterprises Plan',
      features: [
        'You Can Mange Only One Account',
        'All Fetures Excess',
        'All Premium Features',
        'Full Support 24X7 On Call',
        'All Fetures Excess',
      ],
      price: { monthly: 299, yearly: 599, old: 2999 },
    },
  ],
}; 