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

  const jobs = await runJobsWithProgressList(
    ctx,
    [
      {
        title: 'updateFamilyMembersStep',
        handler: async (_ctx) => {
          const bgCtx = await createBackgroundPage(_ctx);
          await updateFamilyMembersStep(bgCtx, data);
        },
      },
      {
        title: 'updateAbsenceQuotaStep',
        handler: async (_ctx) => {
          const bgCtx = await createBackgroundPage(_ctx);
          await updateAbsenceQuotaStep(bgCtx, data);
        },
      },
    ],
    {
      concurrency: 2,
    },
  );

  jobs.forEach((job) => {
    // @ts-ignore
    const err = job.result;
    if (typeof err !== 'undefined') {
      throw err;
    }
  });

  await successStep(ctx);
}
