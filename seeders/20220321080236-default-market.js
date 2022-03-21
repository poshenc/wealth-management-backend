'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'root',
      email: '123@123.123',
      password: '123',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
      .then(userId => queryInterface.bulkInsert('Markets',
        [
          {
            ticker: 'AAPL',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Vectorized_Apple_gray_logo.svg/768px-Vectorized_Apple_gray_logo.svg.png',
            price: '160.84',
            movement: '+3.8',
            change: '+1.5%',
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ticker: 'TSLA',
            image: 'https://storage.googleapis.com/webdesignledger.pub.network/WDL/12f213e1-t1.jpg',
            price: '900.13',
            movement: '+5.6',
            change: '+2.4%',
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },

        ], {}))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Markets', null, {})
      .then(() => queryInterface.bulkDelete('Users', null, {}))
  }
}