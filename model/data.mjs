// mock db model -- see seed.sql for actual data model in postgres
const USERS = [{
    id: 1,
    username: "fuzzy@bear.com"
  },
  {
    id: 2,
    username: "warm@bear.com"
  },
  {
    id: 3,
    username: "cold@bear.com"
  },
  {
    id: 4,
    username: "care@bear.com"
  },
  {
    id: 5,
    username: "1-999-000-1212"
  },
];
const TWEETS = [{
    id: 1,
    text: "sample tweet1",
    user_id: 1
  },
  {
    id: 2,
    text: "sample tweet2",
    user_id: 3
  },
  {
    id: 3,
    text: "sample tweet3, 1st by user4",
    user_id: 4
  },
  {
    id: 4,
    text: "sample tweet4, 2nd by user4",
    user_id: 4
  },
  {
    id: 5,
    text: "sample tweet5",
    user_id: 5
  },
];


export {
  USERS,
  TWEETS
}
