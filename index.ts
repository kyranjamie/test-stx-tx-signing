import {
  makeSTXTokenTransfer,
  makeUnsignedSTXTokenTransfer,
  StacksTestnet,
  pubKeyfromPrivKey,
} from '@blockstack/stacks-transactions';
import BlockstackApp from '@zondax/ledger-blockstack';
import BN from 'bn.js'

// of mnemonic "song wonder december coyote bench zebra ordinary buyer verb gift icon upgrade occur upper valid essence dance ski hour denial question master prison below"
const testRecipient = 'ST4VFKC1WG386T43ZSMWTVM9TQGCXHR3R1VF99RV';
const testPrivateKey = '5db4f7bb20960c6b1ceaa599576c3f01ec96448dc33d7894cc187b941f15cd3201';
const derivationPathUsed = `m/44'/5757'/0'/0/0`;

describe('behavior of transaction signing', () => {
  test('signature from tx lib, private key', async () => {
    const tx = await makeSTXTokenTransfer({
      recipient: testRecipient,
      network: new StacksTestnet(),
      amount: new BN(1),
      senderKey: testPrivateKey,
    });
    expect(tx.auth.spendingCondition?.signature.signature).toEqual(
      '01cf5d472697bbd084cc31c25fbad614820f96d29ee24d3fc9d31e6227fdbba2615878d81f7fbb8ed98a9e916c7ce19cea45b1b391ab14a1468bb636fd718ddb7e'
    );
  });
  
  test('signature from tx lib, public key', async () => {
    const tx = await makeUnsignedSTXTokenTransfer({
      recipient: testRecipient,
      network: new StacksTestnet(),
      amount: new BN(1),
      publicKey: pubKeyfromPrivKey(testPrivateKey).data,
    });
    const valuePassedToLedgerApp = tx.serialize();
    console.log(valuePassedToLedgerApp.toString('hex'));
    expect(tx.auth.spendingCondition?.signature.signature).toEqual(
      '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    );
  });

  test('ledger app, ', () => {
    // copied from local environment with ledger set up, signing tx exactly as above
    // const resp = await blockstackApp.sign(`m/44'/5757'/0'/0/0`, tx.serialize());
    const signedResponseFromLedger =
      '9665e99bcf51fc715014315309151e8666c8c05ce05eba01f5433cf4e29447e8311cbba3d9df74aa3d8ca4d4956755798528b8b55d44d82a31e345d455dff4f101';
  })
});