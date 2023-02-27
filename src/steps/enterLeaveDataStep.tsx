import {EmployeeData} from './extractRequestDataStep';
import {Context, showProgress, click, showForm} from '@matterway/sdk';
import {enterChildDataStep} from './enterChildDataStep';

export interface LeaveData {
  startDate: string;
  endDate: string;
}

export async function enterLeaveDataStep(
  ctx: Context,
  data: {
    employee: EmployeeData;
  },
) {
  console.log('step: enterLeaveDataStep', data);

  showProgress(ctx, 'Open the leave request...');
  await click(ctx, '.open-attachment:nth-child(1)');

  const formResult = await showForm(ctx, {
    fields: [
      {
        type: 'group',
        fields: [
          {
            type: 'date',
            id: 'startDate',
            props: {
              label: 'Start of leave',
            },
            validation: {
              type: 'date',
              rules: [{type: 'required', params: ['Required']}],
            },
          },
          {
            type: 'date',
            id: 'endDate',
            props: {
              label: 'End of leave',
            },
            validation: {
              type: 'date',
              rules: [{type: 'required', params: ['Required']}],
            },
          },
        ],
      },
    ],
    initialData: {
      userYearInput: new Date(),
    },
    navigation: {
      buttons: [
        {
          id: 'proceedButton',
          text: 'Submit',
          onlyIfValid: true,
        },
      ],
    },
    header: {
      title: 'LEAVES',
      description: 'Enter the terms for the leave of absence',
    },
  });
  const leave = formResult.data as LeaveData;

  showProgress(ctx, 'Close the leave request...');
  await click(ctx, '#image-viewer-overlay');

  // Jump to your next step here
  return await enterChildDataStep(ctx, {...data, leave});
}
