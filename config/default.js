/**
 * Created by sandeepkumar on 08/09/17.
 */

require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8100,
  NODE_ENV: process.env.NODE_ENV,
};
