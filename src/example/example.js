const { SetInheriteeKey, SetInheritor, GetInheritorKey, GetFileCount, AddFile, GetFile, EncryptFile, CalculateHash, DecryptFile } = require('../client')
// window.DIFCClient = require('../client')


///EDITED////////////
const express = require('express')
let cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser');
let ejs = require('ejs');
const Handlebars = require("handlebars");
const template = Handlebars.compile("Name: {{name}}");
let PORT = 3080;

const DIFCClient = require('../client')
const app = express()
  .set('port', PORT)
  // .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(cors())

app.get('/', function (req, res) {
  // console.log('LIVEEE')
  // res.sendFile(path.join(__dirname, 'index.html'));
  let DIFCClientt = require('../client')
  // res.sendFile(path.join(__dirname, 'views', 'index.html'));
  res.send(`
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>Library Example</title>
</head>

<body>
<script type="module" src="example.js"></script>
<script> window.aaa = ${6}</script>
  <h1>Hello, please look at the console!</h1>
  <h3>Get ready for new research!</h3>
</body>

</html>
  
  
`);
  // res.render('/', {text1: DIFCClientt});
  // res.send(DIFCClient);
})
app.listen(app.get('port'), function () {

  console.log('Node app is running on http://localhost:' + PORT + '');
})


//////////////////////////////
// async function test() {
//   const newContractId = '0.0.47856905'
//   const addr = '0000000000000000000000000000000002d94f1a'

//   // set inheriteeKey
//   await SetInheriteeKey(newContractId)
//   // set inheritee as inheritor
//   await SetInheritor(newContractId, addr, addr)

//   const inheritorKey = await GetInheritorKey(newContractId, addr)
//   console.log('The inheritor key is ' + inheritorKey)

//   let fileCount = await GetFileCount(newContractId, addr)
//   console.log(`Initial file count ${fileCount}`)

//   await AddFile(
//     newContractId,
//     JSON.stringify({
//       name: 'test',
//       location: 'test loc',
//       hash: 'test hash'
//     })
//   )
//   fileCount = await GetFileCount(newContractId, addr)
//   console.log(`File count ${fileCount}`)

//   const file = await GetFile(newContractId, addr, 0)
//   console.log(`File contents ${file}`)

//   const content =
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
//   const encryptedFile = await EncryptFile(content, inheritorKey)
//   const hashEncryptedFile = await CalculateHash(encryptedFile)
//   console.log(`Hash encrypted file: ${hashEncryptedFile}`)

//   const decryptedFile = await DecryptFile(encryptedFile, inheritorKey)
//   const hashDecryptedFile = await CalculateHash(decryptedFile)
//   console.log(`Hash decriptedFile file: ${hashDecryptedFile}`)
// }
// test()
module.exports = DIFCClient;