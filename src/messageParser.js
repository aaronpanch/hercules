function parseDeploy (message) {
  const deployPattern = /([-\.\w]+)(?:\/([^\s]+))?(?:\s+(?:to|in|on))\s+([-\.\w]+)/
      , commandParts = message.trim().match(deployPattern);

  if (commandParts) {
    return {
      appName: commandParts[1],
      branch: commandParts[2] || 'master',
      environment: commandParts[3]
    }
  }
}

module.exports.parseDeploy = parseDeploy;
