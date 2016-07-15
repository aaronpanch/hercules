const co = require('co');

const appsHandler = {
  list: co.wrap(function *(ctx) {
    let apps = yield this.db.App.findAll();
    ctx.body = apps;
  })
}

module.exports = appsHandler;
