import {EmployeeData, LeaveData, ChildData} from 'shared/types';
import {Context, createBackgroundPage} from '@matterway/sdk';
import {showUI} from '@matterway/sdk/lib/UIv2';
import {URL_EMPLOYEE_MASTER_DATA} from 'shared/constants';
import {updateFamilyMembersStep} from './updateFamilyMembersStep';
import {updateAbsenceQuotaStep} from './updateAbsenceQuotaStep';

export async function updateMasterDataStep(
  ctx: Context,
  data: {
    employee: EmployeeData;
    leave: LeaveData;
    child: ChildData;
  },
) {
  console.log('step: updateMasterDataStep', data);

  const jobs = await showUI.runJobsWithProgressList(
    ctx,
    [
      {
        title: 'updateFamilyMembersStep',
        handler: async () => {
          const backgroundCtx = await createBackgroundPage(
            ctx,
            URL_EMPLOYEE_MASTER_DATA,
          );
          await updateFamilyMembersStep(backgroundCtx, data);
        },
      },
      {
        title: 'updateAbsenceQuotaStep',
        handler: async () => {
          const backgroundCtx = await createBackgroundPage(
            ctx,
            URL_EMPLOYEE_MASTER_DATA,
          );
          await updateAbsenceQuotaStep(backgroundCtx, data);
        },
      },
    ],
    {concurrency: 2},
  );

  jobs.forEach((job) => {
    // @ts-ignore
    const err = job.result;
    if (typeof err !== 'undefined') {
      throw err;
    }
  });
}
