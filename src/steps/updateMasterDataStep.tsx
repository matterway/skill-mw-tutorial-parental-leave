import {EmployeeData, LeaveData, ChildData} from 'shared/types';
import {Context, createBackgroundPage, runJobs} from '@matterway/sdk';
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

  const jobs = await runJobs(ctx, [
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
  ]);

  jobs.forEach((job) => {
    // @ts-ignore
    const err = job.result;
    if (typeof err !== 'undefined') {
      throw err;
    }
  });
}
