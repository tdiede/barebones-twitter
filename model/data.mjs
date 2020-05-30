// mock db model -- see seed.sql for actual data model in postgres
const TWEETS = [{
    id: 1,
    text: "sample tweet1",
    user: {
      id: 1,
      username: "fuzzy@bear.com"
    },
  },
  {
    id: 2,
    text: "sample tweet2",
    user: {
      id: 3,
      username: "cold@bear.com"
    },
  },
  {
    id: 3,
    text: "sample tweet3, 1st by user4",
    user: {
      id: 4,
      username: "care@bear.com"
    },
  },
  {
    id: 4,
    text: "sample tweet4, 2nd by user4",
    user: {
      id: 4,
      username: "care@bear.com"
    },
  },
  {
    id: 5,
    text: "sample tweet5",
    user: {
      id: 5,
      username: "1-999-000-1212"
    },
  },
];

const USERS = [{
    id: 1,
    username: "fuzzy@bear.com",
    tweets: [TWEETS[0]]
  },
  {
    id: 2,
    username: "warm@bear.com",
    tweets: []
  },
  {
    id: 3,
    username: "cold@bear.com",
    tweets: [TWEETS[1]]
  },
  {
    id: 4,
    username: "care@bear.com",
    tweets: [TWEETS[2], TWEETS[3]]
  },
  {
    id: 5,
    username: "1-999-000-1212",
    tweets: [TWEETS[4]]
  },
];


export {
  USERS,
  TWEETS
}
