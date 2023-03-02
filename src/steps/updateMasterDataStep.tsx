import {updateFamilyMembersStep} from './updateFamilyMembersStep';
import {updateAbsenceQuotaStep} from './updateAbsenceQuotaStep';
import {Context, showProgress, runJobsWithProgressList} from '@matterway/sdk';
import {connectToMinimisedWindow} from '@matterway/connection-manager';
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

  // Create new background connection
  const browser = ctx.browser;
  const backgroundBrowser = await connectToMinimisedWindow(browser);

  const errors = await runJobsWithProgressList(
    ctx,
    [
      {
        title: 'updateFamilyMembersStep',
        handler: async (ctx: Context) => {
          const bgCtx = {
            ...ctx,
            browser: backgroundBrowser,
            page: await backgroundBrowser.newPage(),
          };
          await updateFamilyMembersStep(bgCtx, data);
        },
      },
      {
        title: 'updateAbsenceQuotaStep',
        handler: async (ctx: Context) => {
          const bgCtx = {
            ...ctx,
            browser: backgroundBrowser,
            page: await backgroundBrowser.newPage(),
          };
          await updateAbsenceQuotaStep(bgCtx, data);
        },
      },
    ],
    {
      concurrency: 4,
    },
  );

  errors.forEach((err) => {
    if (typeof err !== 'undefined') {
      throw err;
    }
  });

  await successStep(ctx);
}
