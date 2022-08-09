import { validate } from 'class-validator';
import { ValidateWithDrawMoney } from '../../../../../src/bank/util/validationDecorators/ValidateWithdrawMoney';

describe('ValidateWithDrawMoney ', () => {
  it('출금 금액은 1000원 단위로 나누어져야 한다.', async () => {
    // given
    const errorWithdrawMoney = -11000;
    const withdrawParam = new WithdrawParam(errorWithdrawMoney);

    // when
    const validationErrors = await validate(withdrawParam);

    // then
    expect(validationErrors).toHaveLength(0);
  });

  it('출금 금액은 음수 여야 한다.', async () => {
    // given
    const errorWithdrawMoney = 11000;
    const withdrawParam = new WithdrawParam(errorWithdrawMoney);

    // when
    const validationErrors = await validate(withdrawParam);

    // then
    expect(validationErrors).toHaveLength(1);
    expect(Object.keys(validationErrors[0].constraints)).toContain(
      'ValidateWithDrawMoneyConstraint',
    );
  });

  it('출금 금액이 1000원 단위가 아닌 경우 에러 발생', async () => {
    // given
    const errorWithdrawMoney = -10200;
    const withdrawParam = new WithdrawParam(errorWithdrawMoney);

    // when
    const validationErrors = await validate(withdrawParam);

    // then
    expect(validationErrors).toHaveLength(1);
    expect(Object.keys(validationErrors[0].constraints)).toContain(
      'ValidateWithDrawMoneyConstraint',
    );
  });
});

class WithdrawParam {
  constructor(withDrawMoney: number) {
    this.withDrawMoney = withDrawMoney;
  }

  @ValidateWithDrawMoney()
  withDrawMoney: number;
}
