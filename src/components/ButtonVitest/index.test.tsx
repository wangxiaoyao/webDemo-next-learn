import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonVitest from './index';

describe('<ButtonVitest>', () => {
  it('点击时触发 onClick', async () => {
    const onClick = vi.fn();
    render(<ButtonVitest onClick={onClick}>click</ButtonVitest>);
    await userEvent.click(screen.getByRole('button', { name: 'click' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('disable 可以生效', async () => {
    const onClick = vi.fn();
    render(
      <ButtonVitest disabled onClick={onClick}>
        test disabled
      </ButtonVitest>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'test disabled' }));
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
