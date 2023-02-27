import {EmployeeData} from './extractRequestDataStep';
import {LeaveData} from './enterLeaveDataStep';
import {Context, waitForSelector, fill, click} from '@matterway/sdk';

export async function updateAbsenceQuotaStep(
  ctx: Context,
  data: {
    employee: EmployeeData;
    leave: LeaveData;
  },
) {
  console.log('step: updateAbsenceQuotaStep');
  const {page} = ctx;

  // Navigate
  await page.goto('https://employee-master-data.demo.matterway.io');
  await waitForSelector(ctx, '#employee-id');
  await fill(ctx, '#employee-id', `${data.employee.id}\n`);

  // Open transaction
  await waitForSelector(ctx, '#transaction-id');
  await fill(ctx, '#transaction-id', '2006\n');

  // Fill form
  await waitForSelector(ctx, '[name="startDate"]');
  await fill(ctx, '[name="startDate"]', data.leave.startDate);
  await fill(ctx, '[name="endDate"]', data.leave.endDate);

  // Save and submit
  await click(ctx, 'form button');
}
