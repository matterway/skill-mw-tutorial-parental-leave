import {Context, waitForSelector, getValue} from '@matterway/sdk';
import {showUI} from '@matterway/sdk/lib/UIv2';
import {t} from 'i18next';
import {EmployeeData} from 'shared/types';

export async function extractRequestDataStep(ctx: Context) {
  console.log('step: extractRequestDataStep');

  // eslint-disable-next-line
  void showUI.progress(ctx, t('extractRequestData.progress'), {overlay: true});
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
