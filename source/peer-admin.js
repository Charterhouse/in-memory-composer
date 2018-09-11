const { IdCard } = require('composer-common')
const { connectionProfile } = require('./connection-profile')
const { generateCredentials } = require('./credentials')

function createPeerAdminCard () {
  const name = 'peerAdmin'
  const roles = ['PeerAdmin', 'ChannelAdmin']
  const metadata = { version: 1, userName: name, roles }
  const credentials = generateCredentials({ name })
  const card = new IdCard(metadata, connectionProfile)
  card.setCredentials(credentials)
  return card
}

module.exports = { createPeerAdminCard }
