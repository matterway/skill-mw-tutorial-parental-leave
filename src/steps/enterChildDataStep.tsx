import {click, showForm, showProgress, Context} from '@matterway/sdk';
import {LeaveData} from './enterLeaveDataStep';
import {EmployeeData} from './extractRequestDataStep';
import {updateMasterDataStep} from './updateMasterDataStep';

export interface ChildData {
  firstName: string;
  lastName: string;
  birthDate: string;
}

export async function enterChildDataStep(
  ctx: Context,
  data: {
    employee: EmployeeData;
    leave: LeaveData;
  },
) {
  console.log('enterchildData step', data);

  await showProgress(ctx, 'Open the birth certificate...');

  await click(ctx, '.open-attachment:nth-child(2)');

  const formResult = await showForm(ctx, {
    fields: [
      {
        type: 'group',
        fields: [
          {
            type: 'text',
            name: 'firstName',
            props: {
              label: 'First name',
            },
            validation: [{type: 'required', message: 'This field is required'}],
          },
          {
            type: 'text',
            name: 'lastName',
            props: {
              label: 'Last name',
            },
            validation: [{type: 'required', message: 'This field is required'}],
          },
          {
            type: 'date',
            name: 'birthDate',
            props: {
              label: 'Date of birth',
            },
            validation: [{type: 'required', message: 'This field is required'}],
          },
        ],
      },
    ],
    initialData: {
      userYearInput: new Date().toISOString().split('T')[0],
    },
    buttons: [
      {
        value: 'proceedButton',
        text: 'Submit',
      },
    ],
    title: 'BIRTH CERTIFICATE',
    description: 'Enter the information about the child',
  });

  const child = formResult.data as ChildData;

  await showProgress(ctx, 'Close the birth certificate...');
  await click(ctx, '#image-viewer-overlay');

  // Jump to your next step here
  return await updateMasterDataStep(ctx, {...data, child});
}
