import {EmployeeData} from './extractRequestDataStep';
import {ChildData} from './enterChildDataStep';
import {Context, fill, click} from '@matterway/sdk';
import {dispatchEnter, setSelect} from 'shared/utils';

export async function updateFamilyMembersStep(
  ctx: Context,
  data: {
    employee: EmployeeData;
    child: ChildData;
  },
) {
  console.log('step: updateFamilyMembersStep', data);
  const {page} = ctx;

  // Navigate
  await page.goto('https://employee-master-data.demo.matterway.io');
  await fill(ctx, '#employee-id', `${data.employee.id}`);
  await dispatchEnter(ctx, '#employee-id');

  // Open transaction
  await fill(ctx, '#transaction-id', '0021');
  await dispatchEnter(ctx, '#transaction-id');

  // Fill form
  await setSelect(ctx, '[name="memberType"]', '2');
  await fill(ctx, '[name="firstName"]', data.child.firstName);
  await fill(ctx, '[name="lastName"]', data.child.lastName);
  await fill(ctx, '[name="birthDate"]', data.child.birthDate);
  await fill(ctx, '[name="birthName"]', data.child.lastName);
  await fill(ctx, '[name="referencePersonNumber"]', data.employee.id);

  // Save and submit
  await click(ctx, 'form button');
}
