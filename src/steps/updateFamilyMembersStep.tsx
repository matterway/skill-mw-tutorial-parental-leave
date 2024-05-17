import {EmployeeData, ChildData} from 'shared/types';
import {Context, fill, click, setProperty, pressEnterKey} from '@matterway/sdk';
import {Page} from 'puppeteer-core';

export async function updateFamilyMembersStep(
  ctx: Context,
  data: {
    employee: EmployeeData;
    child: ChildData;
  },
) {
  console.log('step: updateFamilyMembersStep', data);

  await fill(ctx, '#employee-id', `${data.employee.id}`);
  await pressEnterKey(ctx, {selector: '#employee-id'});

  // Open transaction
  await fill(ctx, '#transaction-id', '0021');
  await pressEnterKey(ctx, {selector: '#transaction-id'});

  // Fill form
  await setProperty(ctx, '[name="memberType"]', 'value', '2');
  await fill(ctx, '[name="firstName"]', data.child.firstName);
  await fill(ctx, '[name="lastName"]', data.child.lastName);
  await fill(ctx, '[name="birthDate"]', data.child.birthDate);
  await fill(ctx, '[name="birthName"]', data.child.lastName);
  await fill(ctx, '[name="referencePersonNumber"]', data.employee.id);

  // Save and submit
  await click(ctx, 'form button');

  // Let's close the page after we used it
  // It will happen anyway when the skill is terminated
  await (ctx.page as Page).close();
}
