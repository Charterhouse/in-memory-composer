const { NetworkCardStoreManager } = require('composer-common')

function createCardStore () {
  return NetworkCardStoreManager.getCardStore({
    type: 'composer-wallet-inmemory'
  })
}

module.exports = { createCardStore }
