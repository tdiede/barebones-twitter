CREATE DATABASE twitter;


CREATE TABLE users (
id SERIAL,
username VARCHAR(30) UNIQUE,
pword_hash CHAR(60),
dob DATE,
home_location VARCHAR(40),
last_login TIMESTAMP,
PRIMARY KEY(id)
);


CREATE TABLE tweets (
id SERIAL,
username VARCHAR(30),
tweet_text VARCHAR(140),
lat NUMERIC(10,6),
lon NUMERIC(10,6),
num_likes INTEGER,
num_retweets INTEGER,
created_at TIMESTAMP DEFAULT current_timestamp
);


INSERT INTO users (username, pword_hash, dob, home_location, last_login)
    VALUES ('testuser0', 'xYa32jI930382kDdfj29gk020jnWwh2K', '2001-11-03', 'San Francisco', '2020-05-18 20:12:33');

INSERT INTO users (username, pword_hash, dob, home_location, last_login)
    VALUES ('testuser1', '8Ya92hjH3033bkDpfj2lGk088eNEE244', '1961-06-16', 'Beijing', '2013-01-16 23:12:01');

INSERT INTO users (username, pword_hash, dob, home_location, last_login)
    VALUES ('testuser2', 'Yka6iJxfj29gIDd020b30kjzZ3482tsS', '1999-04-18', 'New York', '2019-01-16 03:19:51');


INSERT INTO tweets (username, tweet_text, lat, lon, num_likes, num_retweets, created_at)
    VALUES ('testuser0', 'Now all @Apple has to do is get swype on the iphone and it will be crack. Iphone that is',
      37.773972, -122.431297, 3, 0, '2020-01-15 13:09:12');

INSERT INTO tweets (username, tweet_text, lat, lon, num_likes, num_retweets, created_at)
    VALUES ('testuser0', 'Save me from #HP''s unwanted OS! Help me buy an #iPhone!',
      37.780133, -122.541002, 0, 0, '2020-01-09 03:19:51');

INSERT INTO tweets (username, tweet_text, lat, lon, num_likes, num_retweets, created_at)
    VALUES ('testuser0', '#Siri now knows who my dad, mom, brother and girlfriend is.  Thanks @apple',
      37.789345, -122.428111, 0, 1, '2019-12-26 04:10:17');

INSERT INTO tweets (username, tweet_text, lat, lon, num_likes, num_retweets, created_at)
    VALUES ('testuser2', 'Bravo, @Apple! http://t.co/BgoTzj7K',
      40.730610, -73.935242, 2, 5, '2011-10-18 10:00:33');
