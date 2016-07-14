let db = [
  {
    name: 'foo'
  }
]

const appsHandler = {
  list: function *(next) {
    this.body = db;
  }
}

module.exports = appsHandler;
