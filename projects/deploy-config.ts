import { AlgorandClient, algos } from '@algorandfoundation/algokit-utils';
import { HelloWorldFactory } from './artifacts/contracts/hello_world/HelloWorldClient';

  async function deploy() {
  console.log('🚀 Deploying HelloWorld...');

  const mnemonic = "brass sing ripple hotel tumble much simple price island panther giant plate ozone cry delay bike try ethics final badge what royal syrup above sugar";

const algorand = AlgorandClient.fromEnvironment();
const deployer = await algorand.account.fromMnemonic(mnemonic);


  const factory = algorand.client.getTypedAppFactory(HelloWorldFactory, {
    defaultSender: deployer.addr,
  }) as ReturnType<typeof HelloWorldFactory>;

  const { appClient, result } = await factory.deploy({
    onUpdate: 'append',
    onSchemaBreak: 'append',
  });

  if (['create', 'replace'].includes(result.operationPerformed)) {
    await algorand.send.payment({
      amount: algos(1),
      sender: deployer.addr,
      receiver: appClient.appAddress,
    });
  }

  const response = await appClient.send.hello({
    args: { name: 'world' },
  });

  console.log(
    `✅ Called hello on ${appClient.appClient.appName} (${appClient.appClient.appId}) with name = world, received: ${response.return}`,
  );
}
