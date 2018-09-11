const { BusinessNetworkDefinition } = require('composer-common')
const { InMemoryBusinessNetwork } = require('./business-network')
const { generateCredentials } = require('./credentials')

class InMemoryComposerConnection {
  constructor ({ cardStore, adminConnection }) {
    this.cardStore = cardStore
    this.adminConnection = adminConnection
  }

  async startBusinessNetwork ({ networkPath }) {
    const definition = await loadBusinessNetwork({ networkPath })
    const name = definition.getName()
    const version = definition.getVersion()
    const userName = `admin@${name}`
    const admin = { userName, ...generateCredentials({ name: userName }) }
    const startOptions = { networkAdmins: [admin] }
    const { cardStore, adminConnection } = this
    await adminConnection.install(definition)
    const cards = await adminConnection.start(name, version, startOptions)
    const adminCard = cards.get(userName)
    return new InMemoryBusinessNetwork({
      cardStore,
      adminCard,
      adminConnection,
      definition
    })
  }
}

async function loadBusinessNetwork ({ networkPath }) {
  return BusinessNetworkDefinition.fromDirectory(networkPath)
}

module.exports = { InMemoryComposerConnection }
