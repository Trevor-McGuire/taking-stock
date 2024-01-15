const axios = require('axios');
const Queue = require('promise-queue');

// Initialize a new queue with a maximum of 5 concurrent requests.
const queue = new Queue(5, Infinity);
const timestamps = [];

const makeRequest = async (url, options) => {
  const result = await queue.add(() => new Promise((resolve, reject) => {
    const now = Date.now();

    const makeAxiosRequest = () => axios(url, options).then(resolve).catch(reject);

    if (timestamps.length === 5) {
      const oldest = timestamps[0];
      const diff = now - oldest;
      console.log("diff", diff)

      if (diff < 60000) {
        setTimeout(makeAxiosRequest, 60000 - diff);
      } else {
        makeAxiosRequest();
      }

      timestamps.shift();
    } else {
      makeAxiosRequest();
    }

    timestamps.push(now);
  }));

  return result;
};

// Function to get the estimated wait time
const getEstimatedWaitTime = () => {
  // Calculate the wait time based on the number of pending requests and the rate limit
  const waitTime = queue.getPendingLength() * (60 / 5);
  return waitTime;
};

module.exports = {
  makeRequest,
  getEstimatedWaitTime
};