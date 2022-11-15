const menu = {
  User: [
    {
      icon: "home",
      text: "Dashboad",
      link: "/dashboard",
    },
    {
      heading: "Rent",
    },
    {
      icon: "building",
      text: "My Rent Request",
      link: "/rent-request",
    },
    {
      icon: "briefcase",
      text: "Houses For Rent",
      link: "/apartments",
    },
    {
      heading: "Earn",
    },
    {
      icon: "plus",
      text: "List an Apartment",
      link: "/new-apartment",
    },
    {
      icon: "building",
      text: "My Listings",
      link: "/apartment-listing",
    },
    {
      icon: "briefcase",
      text: "Transaction History",
      link: "/transactions",
    },

  ],

  Admin: [
    {
      icon: "home",
      text: "Dashboad",
      link: "/dashboard",
    },
    {
      icon: "building",
      text: "Apartments",
      active: false,
      subMenu: [
        {
          text: "Pending",
          link: "/apartment/pending",
        },
        {
          text: "Approved",
          link: "/apartment/approved",
        },
        {
          text: "Declined",
          link: "/apartment/declined",
        },
        {
          text: "Closed",
          link: "/apartment/closed",
        },
      ],
    },
    {
      icon: "building",
      text: "Corporate",
      active: false,
      subMenu: [
        {
          text: "Pending",
          link: "/corporate/pending",
        },
        {
          text: "Approved",
          link: "/corporate/approved",
        },
        {
          text: "Declined",
          link: "/corporate/declined",
        },
      ],
    },
  ],
  Corporate: [
    {
      icon: "brick-fill",
      text: "Dashboad",
      link: "/dashboard",
    },
    {
      icon: "building",
      text: "Apartments",
      link: "/apartments",
    },
  ]
};
export default menu;
