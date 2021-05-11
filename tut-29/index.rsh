'reach 0.1';

// makeEnum(N) -> First entry is Fun([UInt], Bool)
const [ isHand, ROCK, PAPER, SCISSOR ] = makeEnum(3);
const [ isOutcome, B_WINS, DRAW, A_WINS ] = makeEnum(3);

const winner = (handA, handB) => ((handA + (4 - handB)) % 3);

assert(winner(ROCK, PAPER) == B_WINS);
assert(winner(PAPER, ROCK) == A_WINS);
assert(winner(ROCK, ROCK) == DRAW);

forall(UInt, handA =>
  forall(UInt, handB =>
    assert(isOutcome(winner(handA, handB)))
  )
);

forall(UInt, (hand) => assert(winner(hand, hand) == DRAW));

const Player = {
  ...hasRandom, // Reach standard library
  getHand: Fun([], UInt),
  seeOutcome: Fun([UInt], Null),
  informTimeout: Fun([], Null)
};
const Alice = {
  ...Player,
  wager: UInt
};
const Bob = {
  ...Player,
  acceptWager: Fun([UInt], Null)
};
const DEADLINE = 10;

export const main = Reach.App(
  {},
  [Participant('Alice', Alice), Participant('Bob', Bob)],
  (A, B) => {
    const informTimeout = () => {
      each([A, B], () => {
        interact.informTimeout();
      });
    };

    A.only(() => {
      const wager = declassify(interact.wager);
    });
    A.publish(wager).pay(wager);
    commit();

    B.only(() => {
      interact.acceptWager(wager);
    });
    B.pay(wager).timeout(DEADLINE, () => closeTo(A, informTimeout));

    var outcome = DRAW;
    invariant(balance() == 2 * wager && isOutcome(outcome));
    while (outcome == DRAW) {
      commit();

      A.only(() => {
        const _handA = interact.getHand();
        const [_commitA, _saltA] = makeCommitment(interact, _handA);
        const commitA = declassify(_commitA);
      });

      A.publish(commitA)
        .timeout(DEADLINE, () => closeTo(A, informTimeout));
      commit();

      unknowable(B, A(_handA, _saltA));
      B.only(() => {
        const handB = declassify(interact.getHand());
      });

      B.publish(handB)
        .timeout(DEADLINE, () => closeTo(A, informTimeout));
      commit();

      A.only(() => {
        const [saltA, handA] = declassify([_saltA, _handA]);
      });
      A.publish(saltA, handA)
        .timeout(DEADLINE, () => closeTo(A, informTimeout));
      checkCommitment(commitA, saltA, handA);

      outcome = winner(handA, handB);
      
      continue;
    }

    const [forA, forB] =
      outcome == A_WINS ? [2, 0] :
      outcome == B_WINS ? [0, 2] :
      [1, 1];

    transfer(forA * wager).to(A);
    transfer(forB * wager).to(B);
    commit();

    each([A, B], () => {
      interact.seeOutcome(outcome);
    });

    exit();
  }
)