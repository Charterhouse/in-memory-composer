const { CertificateUtil } = require('composer-common')

function generateCredentials ({ name }) {
  return CertificateUtil.generate({ commonName: name })
}

module.exports = { generateCredentials }
