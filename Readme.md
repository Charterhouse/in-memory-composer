In-memory Hyperledger Composer
==============================

For testing, you might want to quickly create an in-memory instance of your
Business Network in Hyperledger Composer. This NodeJS module enables you to do
just that.

Installation
------------

Using NPM:

```bash
npm install --save-dev in-memory-composer
```

or, if you're using [Yarn](https://yarnpkg.com):

```bash
yarn add --dev in-memory-composer
```

Usage
-----

Importing the module:

```javascript
const { InMemoryComposer } = require('in-memory-composer')
```

Create new instance of in-memory composer, and connect to it:

```javascript
const composer = new InMemoryComposer()
const composerConnection = await composer.connect()
```

Start a business network from a local path. When writing tests for a business
network, you typically want to load the business network from a parent directory
of the tests:

```javascript
const path = require('path')
const networkPath = path.resolve(__dirname, '..')
const network = await composerConnection.startBusinessNetwork({ networkPath })
```

Login as the network admin:

```javascript
const businessNetworkConnection = await network.connectAdmin()
```

Login as someone else:

```javascript
const johnsCard = await network.createCard{ name: 'John Doe' }
const johnsConnection = await network.connect({ card: johnsCard })
```

Retrieve the Factory associated with the business network:

```javascript
const factory = network.getFactory()
```
