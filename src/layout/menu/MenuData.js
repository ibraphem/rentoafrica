const menu = {
  Agent: [
    {
      icon: "home",
      text: "Homepage",
      link: "/",
    },
    {
      icon: "brick-fill",
      text: "Dashboad",
      link: "/dashboard",
    },
    {
      icon: "building",
      text: "Listings",
      link: "/apartment-listing",
    },
    {
      icon: "briefcase",
      text: "Transactions",
      link: "/transactions",
    },
    {
      icon: "plus",
      text: "Add New",
      link: "/new-apartment",
    },
  ],

  Admin: [
    {
      icon: "brick-fill",
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
