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
      icon: "tile-thumb",
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
  ],

};
export default menu;
