const { IdCard } = require('composer-common')
const { generateCredentials } = require('./credentials')
const { BusinessNetworkConnection } = require('composer-client')

class InMemoryBusinessNetwork {
  constructor ({ cardStore, adminCard, adminConnection, definition }) {
    this.cardStore = cardStore
    this.adminCard = adminCard
    this.adminConnection = adminConnection
    this.definition = definition
  }

  async connect ({ card }) {
    const cardStore = this.cardStore
    const cardName = card.getUserName()
    const connection = new BusinessNetworkConnection({ cardStore })
    await this.adminConnection.importCard(cardName, card)
    await connection.connect(cardName)
    return connection
  }

  async connectAdmin () {
    return this.connect({ card: this.adminCard })
  }

  async createCard ({ name }) {
    const { adminCard } = this
    const businessNetwork = adminCard.getBusinessNetworkName()
    const metadata = { version: 1, userName: name, businessNetwork }
    const connectionProfile = adminCard.getConnectionProfile()
    const credentials = generateCredentials({ name })
    const card = new IdCard(metadata, connectionProfile)
    card.setCredentials(credentials)
    return card
  }

  getFactory () {
    return this.definition.getFactory()
  }
}

module.exports = { InMemoryBusinessNetwork }
