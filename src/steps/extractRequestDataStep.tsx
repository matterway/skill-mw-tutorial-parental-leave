import {Context, showProgress, waitForSelector, getValue} from '@matterway/sdk';
import {t} from 'i18next';
import {EmployeeData} from 'shared/types';

export async function extractRequestDataStep(ctx: Context) {
  console.log('step: extractRequestDataStep');

  // eslint-disable-next-line
  showProgress(ctx, t('extractRequestData.progress'));
  await waitForSelector(ctx, '[name="incident.employeeId"]');
  const id = (await getValue(ctx, '[name="incident.employeeId"]')) || '';
  const fullName =
    (await getValue(ctx, '[name="incident.employeeFullName"]')) || '';

  const result: EmployeeData = {
    id,
    fullName,
  };

  console.log('step: extractRequestDataStep end', result);
  return result;
}
