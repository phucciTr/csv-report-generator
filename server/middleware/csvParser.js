let test = 'testing promise';

const csvParser = (req, res, next) => {
  Promise.resolve(test)
    .then((result) => {
      console.log('result = ', result);
    })
    .catch((err) => {
      console.log('err = ', err);
    });
};

module.exports = {
  csvParser : csvParser
};