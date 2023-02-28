import {EmployeeData} from './extractRequestDataStep';
import {LeaveData} from './enterLeaveDataStep';
import {Context, fill, click, pressEnterKey} from '@matterway/sdk';

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
  await fill(ctx, '#employee-id', `${data.employee.id}`);
  await pressEnterKey(ctx);

  // Open transaction
  await fill(ctx, '#transaction-id', '2006');
  await pressEnterKey(ctx);

  // Fill form
  await fill(ctx, '[name="startDate"]', data.leave.startDate);
  await fill(ctx, '[name="endDate"]', data.leave.endDate);

  // Save and submit
  await click(ctx, 'form button');
}
