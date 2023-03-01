import {Context, waitForSelector} from '@matterway/sdk';

export async function dispatchEnter(ctx: Context, selector: string) {
  return await ctx.page.evaluate((selector) => {
    const keyboardEvent = new KeyboardEvent('keydown', {
      code: 'Enter',
      key: 'Enter',
      charCode: 13,
      keyCode: 13,
      view: window,
      bubbles: true,
    });
    document.querySelector(selector)?.dispatchEvent(keyboardEvent);
  }, selector);
}

export async function setSelect(ctx: Context, selector: string, value: string) {
  await waitForSelector(ctx, selector);
  return await ctx.page.evaluate((selector) => {
    const select = document.querySelector(selector) as HTMLSelectElement;
    select.value = value;
  }, selector);
}
