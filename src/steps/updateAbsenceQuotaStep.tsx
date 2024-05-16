import {EmployeeData, LeaveData} from 'shared/types';
import {Context, fill, click, pressEnterKey} from '@matterway/sdk';
import {Page} from 'puppeteer-core';

export async function updateAbsenceQuotaStep(
  ctx: Context,
  data: {
    employee: EmployeeData;
    leave: LeaveData;
  },
) {
  console.log('step: updateAbsenceQuotaStep', data);

  await fill(ctx, '#employee-id', `${data.employee.id}`);
  await pressEnterKey(ctx, {selector: '#employee-id'});

  // Open transaction
  await fill(ctx, '#transaction-id', '2006');
  await pressEnterKey(ctx, {selector: '#transaction-id'});

  // Fill form
  await fill(ctx, '[name="startDate"]', data.leave.startDate);
  await fill(ctx, '[name="endDate"]', data.leave.endDate);

  // Save and submit
  await click(ctx, 'form button');

  // Let's close the page after we used it
  // It will happen anyway when the skill is terminated
  await (ctx.page as Page).close();
}
