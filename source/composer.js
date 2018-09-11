const { createCardStore } = require('./card-store')
const { createPeerAdminCard } = require('./peer-admin')
const { InMemoryComposerConnection } = require('./composer-connection')
const { AdminConnection } = require('composer-admin')

class InMemoryComposer {
  constructor () {
    this.cardStore = createCardStore()
    this.adminCard = createPeerAdminCard()
  }

  async connect () {
    const cardStore = this.cardStore
    const card = this.adminCard
    const cardName = card.getUserName()
    const adminConnection = new AdminConnection({ cardStore })
    await adminConnection.importCard(cardName, card)
    await adminConnection.connect(cardName)
    return new InMemoryComposerConnection({ cardStore, adminConnection })
  }
}

module.exports = { InMemoryComposer }
