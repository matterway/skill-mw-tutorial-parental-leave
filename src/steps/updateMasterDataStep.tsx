import {updateFamilyMembersStep} from './updateFamilyMembersStep';
import {updateAbsenceQuotaStep} from './updateAbsenceQuotaStep';
import {
  Context,
  showProgress,
  runJobsWithProgressList,
  createBackgroundPage,
} from '@matterway/sdk';
import {EmployeeData} from './extractRequestDataStep';
import {LeaveData} from './enterLeaveDataStep';
import {ChildData} from './enterChildDataStep';
import {successStep} from './@success';

export async function updateMasterDataStep(
  ctx: Context,
  data: {
    employee: EmployeeData;
    leave: LeaveData;
    child: ChildData;
  },
) {
  // This might take a while. let's show progress, for good measure
  await showProgress(ctx, 'Starting background tasks...');

  // const bgCtx = (await createBackgroundPage(ctx)) as Context;
  // await updateFamilyMembersStep(bgCtx, data);
  // const bgCtx2 = (await createBackgroundPage(ctx)) as Context;
  // await updateAbsenceQuotaStep(bgCtx2, data);

  const errors = await runJobsWithProgressList(
    ctx,
    [
      {
        title: 'updateFamilyMembersStep',
        handler: async (ctx) => {
          await updateFamilyMembersStep(
            (await createBackgroundPage(ctx)) as Context,
            data,
          );
        },
      },
      {
        title: 'updateAbsenceQuotaStep',
        handler: async (ctx) => {
          await updateAbsenceQuotaStep(
            (await createBackgroundPage(ctx)) as Context,
            data,
          );
        },
      },
    ],
    {
      concurrency: 2,
    },
  );

  errors.forEach((err) => {
    if (typeof err !== 'undefined') {
      throw err;
    }
  });

  await successStep(ctx);
}
