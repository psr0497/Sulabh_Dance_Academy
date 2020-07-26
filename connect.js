const mongoose = require('mongoose');

const assert = require('assert')

const db_url = process.env.Db_URL

mongoose.connect(
  db_url,
  {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true
  },

  function(error,result){

    assert.equal(error,null,'DB_connection_fails')

    console.log('DB_connect_Success');
  }


);