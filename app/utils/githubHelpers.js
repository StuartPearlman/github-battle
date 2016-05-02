import axios from 'axios';

const id = 'YOUR_CLIENT_ID';
const sec = 'YOUR_CLIENT_SECRET';
const param = '?client_id=' + id + '&client_secret=' + sec;

function getUserInfo(username) {
  return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getTotalStars(repos) {
  return repos.data.reduce((prev, current) => prev + current.stargazers_count, 0);
}

function getPlayersData(player) {
  return getRepos(player.login)
  .then(getTotalStars)
  .then((totalStars) => {
    return {
      followers: player.followers,
      totalStars: totalStars
    };
  });
}

function calculateScores(players) {
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ];
}

export function getPlayersInfo(players) {
  return axios.all(players.map((username) => getUserInfo(username)))
  .then((info) => info.map((user) => user.data))
  .catch((error) => {
    console.warn('Error in githubHelpers.getPlayersInfo', error);
  });
};

export function battle(players) {
  const playerOneData = getPlayersData(players[0]);
  const playerTwoData = getPlayersData(players[1]);

  return axios.all([ playerOneData, playerTwoData ])
  .then(calculateScores)
  .catch((error) => {
    console.warn('Error in githubHelpers.battle', error);
  });
};
