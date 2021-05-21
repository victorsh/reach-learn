/*
  Implementing Hash Lock functionality so that a sender can
  allow access to funds to a receiver through a shared password.

  Participatns: Sender & Receiver
  Sender knows: Password & Amount to send
  Receiver knows: nothing

  Reveal: Sender password, sender amount, receiver password

  Send publishes a digest of the password and pays the amount
  Receiver publishes the password
  Consensus ensures it's the right password and pays Receiver
*/
'reach 0.1';

const sender = {
  amt: UInt,
  pass: UInt
}

const receiver = {
  getPass: Fun([], UInt)
}

export const main = Reach.App(
  {},
  [Participant('Sender', sender), Participant('Receiver', receiver)],
  (A, B) => {
    A.only(() => {
      const _pass = interact.pass;
      
      const amount = declassify(interact.amt);
    });
    A.publish(amount).pay(amount);
    commit();

    B.only(() => {
      const pass = declassify(interact.getPass);
    });
    commit();

    transfer(amount).to(B);
    commit()
  }
)