import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

(async () => {
  const stdlib = await loadStdlib();
  const startingBalance = stdlib.parseCurrency(10);
  const accDeployer = await stdlib.newTestAccount(startingBalance);
  const accAttacher = await stdlib.newTestAccount(startingBalance);

  const fmt = (x) => stdlib.formatCurrency(x, 4);
  const getBalance = async (who) => fmt(await stdlib.balanceOf(who));

  const deployerInitialBalance = await getBalance(accDeployer);
  const attacherInitialBalance = await getBalance(accAttacher);

  const ctcDeployer = accDeployer.deploy(backend);
  const ctcAttacher = accAttacher.attach(backend, ctcDeployer.getInfo());

  const Player = {
    ...stdlib.hasRandom,
    seeOutcome: (outcome) => {
      console.log(`${Who} saw outcome ${outcome}`);
    },
    informTimeout: () => {
      console.log(`${Who} observed a timeout`);
    }
  };

  await Promise.all([
    backend.deployer(
      ctcDeployer,
      {
        ...Player('Deployer'),
        
      }
    )
  ])

})();