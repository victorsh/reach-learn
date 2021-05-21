# Reach Learn

This repository contains several interations of the rock paper scissors Reach tutorial.

#### How to Run
- `REACH_CONNECTOR_MODE=ALGO reach react`

#### Breakdown
Applications starts at index.js everything is connected here. Switched to `@reach-sh/stdlib/ALGO` from `@reach-sh/stdlib/ETH`

Constructor imports props from super. This may be an outdated version of react.

###### Reach Commands
- `reach.getDefaultAccount()`
- `reach.formatCurrency(num, digi)`
- `reach.balanceOf(account)`
- `reach.parseCurrency(amount)`


#### Useful Commands
Check & Clear Port
- `lsof -i : <PORT>`
- `sudo kill -9 <PID>`

Docker
- `docker kill $(docker ps -q)`
- `docker rm $(docker ps -qa)`

