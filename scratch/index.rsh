'reach 0.1';

const player = {
  wager: UInt,
  seeOutcome: Fun([UInt], Null),
  informTimeout: Fun([], Null)
};
const deployer = {
  ...player,
  wager: UInt
};
const attacher = {
  ...player,
  acceptWager: Fun([UInt], Null)
};

export const main = Reach.App(
  {},
  [Participant('deployer', deployer), Participant('attacher', attacher)],
  (A, B) => {
    A.only(() => {
      const wager = declassify(interact.wager)
    });
    A.publish(wager)
    commit();

    exit();
  }
);