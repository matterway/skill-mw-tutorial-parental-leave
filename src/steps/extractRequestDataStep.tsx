import {Context, getValue, showProgress, waitForSelector} from '@matterway/sdk';
import {enterLeaveDataStep} from './enterLeaveDataStep';
export interface EmployeeData {
  id: string;
  fullName: string;
}

export async function extractRequestDataStep(ctx: Context) {
  console.log('step: extractRequestDataStep');

  showProgress(ctx, 'Extracting data from request...');
  await waitForSelector(ctx, '[name="incident.employeeId"]');
  const employeeId = await getValue(ctx, '[name="incident.employeeId"]');
  const employeeFullName = await getValue(
    ctx,
    '[name="incident.employeeFullName"]',
  );

  const employee: EmployeeData = {
    id: employeeId as string,
    fullName: employeeFullName as string,
  };

  // Jump to your next step here
  return await enterLeaveDataStep(ctx, {employee});
}
