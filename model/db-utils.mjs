import _ from 'lodash';

import {
  USERS,
  TWEETS
} from './data.mjs';


// TODO: Use actual persistence layer with repository pattern

// in-memory db utils
const getUsers = () => {
  return USERS;
}

const getTweets = () => {
  return TWEETS;
}

const addUser = (user) => {
  return USERS.push(user);
}

const postTweet = (tweet) => {
  return TWEETS.push(tweet);
}

const editTweet = (tweet) => {
  _.remove(TWEETS, existingTweet => existingTweet.id === tweet.id);
  return TWEETS.push(tweet);
}

const deleteTweet = (tweet) => {
  _.remove(TWEETS, existingTweet => existingTweet.id === tweet.id);
  return !getTweetById(tweet.id)
}

const getUserById = (id) => {
  return USERS.find(user => user.id === id);
}

const getUserByUsername = (username) => {
  return USERS.find(user => user.username === username);
}

const getTweetById = (id) => {
  return TWEETS.find(tweet => tweet.id === id);
}

const getTweetsByUserId = (userId) => {
  return TWEETS.filter(tweet => tweet.user_id === userId);
}

const getTweetsByUsername = (username) => {
  return TWEETS.filter(tweet => tweet.user_id === getUserByUsername(username).id);
}


export default {
  getUsers,
  getTweets,
  addUser,
  postTweet,
  editTweet,
  deleteTweet,
  getUserById,
  getUserByUsername,
  getTweetById,
  getTweetsByUserId,
  getTweetsByUsername
};
