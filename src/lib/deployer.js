"use strict";

const config = require('config');
const fs = require('fs');
const co = require('co');
const request = require('request');
const rp = require('request-promise');
const child_process = require('child_process');

function tellGithub(app, deployment) {
  return rp({
    method: 'POST',
    uri: config.providers.github.endpoint + '/repos/' + app.owner + '/' + app.repo + '/deployments',
    qs: { access_token: '7a74429b23220f8113df3ea902cc3cbdf40bc02a' },
    headers: {
      'User-Agent': 'hercules',
      'Accept': 'application/vnd.github.ant-man-preview+json'
    },
    body: {
      ref: deployment.ref,
      environment: 'production'//,
      // transient_environment: true,
      // production_environment: true
    },
    json: true
  });
}

function tellGithubItWorked(deployment, location) {
  return rp({
    method: 'POST',
    uri: deployment.github_status_url,
    qs: { access_token: '7a74429b23220f8113df3ea902cc3cbdf40bc02a' },
    headers: {
      'User-Agent': 'hercules',
      'Accept': 'application/vnd.github.ant-man-preview+json'
    },
    body: {
      state: 'success',
      target_url: location,
      environment_url: location
    },
    json: true
  });
}

function getCode(app, ref) {
  let url = `${config.providers.github.endpoint}/repos/${app.owner}/${app.repo}/tarball/${ref}`;
  console.log("Downloading Source from " + url);
  let path = 'tmp/source.tar.gz';
  return new Promise((resolve, reject) => {
    request({
      url,
      qs: { access_token: '7a74429b23220f8113df3ea902cc3cbdf40bc02a' },
      headers: {
        'User-Agent': 'hercules'
      }
    })
      .on('error', (err) => { reject(err); })
      .pipe(fs.createWriteStream(path))
      .on('close', () => { resolve(path); });
  });
}

function unpackCode(path) {
  console.log("Unpacking!");

  return new Promise((resolve, reject) => {
    child_process.exec('mkdir tmp/source; tar -xzf ' + path + ' -C tmp/source --strip-components=1', function (err, stdout, stderr) {
      if (err) {
        console.log("child processes failed with error code: " + err.code);
        console.log(stderr);
        reject(err);
      }
      resolve('tmp/source');
    });
  });
}

function buildImage(app, deployment, dir) {
  console.log("Building Image!");

  let image_name = `${app.owner}-${app.repo}:${deployment.id}`;
  return new Promise((resolve, reject) => {
    child_process.exec(`docker build -t ${image_name} ${dir}`, function (err, stdout, stderr) {
      if (err) {
        console.log("child processes failed with error code: " + err.code);
        console.log(stderr);
        reject(err);
      }

      console.log(stdout);
      resolve(image_name);
    });
  });
}

function runImage(image) {
  console.log("Building Image!");

  return new Promise((resolve, reject) => {
    child_process.exec(`docker run -p 80:4000 -d ${image}`, function (err, stdout, stderr) {
      if (err) {
        console.log("child processes failed with error code: " + err.code);
        console.log(stderr);
        reject(err);
      }

      console.log(stdout);
      resolve('192.168.99.100');
    });
  });
}

function deploy(deployment, db) {
  console.log("Starting deployment!");

  return co(function* () {
    let app = yield db.App.findById(deployment.AppId);
    let githubDeployment = yield tellGithub(app, deployment);
    deployment.github_status_url = githubDeployment.statuses_url;

    yield deployment.save();

    let file = yield getCode(app, deployment.ref);
    let dir = yield unpackCode(file);
    let image = yield buildImage(app, deployment, dir);
    let ip = yield runImage(image);

    console.log(ip);
    let resp = yield tellGithubItWorked(deployment, `http://${ip}`);
    console.log(resp);
  }).catch((err) => {
    console.log(err);
  });
}

module.exports = deploy;
