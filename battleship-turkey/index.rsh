'reach 0.1';

const [isOutcome, GameDraw, GameAdmin, GamePlayer] = makeEnum(3);
const winner = (firedTorpedos) => (firedTorpedos > 50 ? 1 : 2);

const AdminInterface = {
  wager: UInt,
  endGame: Fun([], Bool),
  seeResults: Fun([], Null)
};

const PlayerInterface = {
  makeMove: Fun([], UInt),
  seeOutcome: Fun([UInt], Null)
};

export const main = Reach.App(
  {},
  [
    Participant('Admin', AdminInterface),
    Participant('Player', PlayerInterface)
  ],
  (A, B) => {
    A.only(() => {
      const wager = declassify(interact.wager);
    });
    A.publish(wager).pay(wager);
    commit();

    B.pay(wager);

    var winnerOutcome = GameDraw;
    invariant(isOutcome(winner));
    while(winnerOutcome == GameDraw) {
      commit();
      
      fork()
      .case(
        A,
        (() => ({
          when: declassify(interact.endGame())
        })),
        () => {
          continue;
        }
      )
      .case(
        B,
        (() => {
          const move = declassify(interact.makeMove());
          return ({
            when: move != 0,
            msg: move
          });
        }),
        (move) => {
          B.only(() => {
            interact.seeOutcome(move);
          });
          A.only(() => {
            interact.seeResults();
          });

          winnerOutcome = winner(move)
          continue;
        }
      )
      .timeout(
        1024, () => {
          Admin.publish();
          continue;
        }
      );
    }

    transfer(balance()).to(winnerOutcome == GameAdmin ? A : B)
    commit();
    exit();
  }
);
