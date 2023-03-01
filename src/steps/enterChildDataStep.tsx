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

  showProgress(ctx, 'Open the birth certificate...');

  await click(ctx, '.open-attachment:nth-child(2)');

  const formResult = await showForm(ctx, {
    fields: [
      {
        type: 'group',
        fields: [
          {
            type: 'text',
            id: 'firstName',
            props: {
              label: 'First name',
            },
            validation: {
              type: 'string',
              rules: [{type: 'required', params: ['Required']}],
            },
          },
          {
            type: 'text',
            id: 'lastName',
            props: {
              label: 'Last name',
            },
            validation: {
              type: 'string',
              rules: [{type: 'required', params: ['Required']}],
            },
          },
          {
            type: 'date',
            id: 'birthDate',
            props: {
              label: 'Date of birth',
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
      title: 'BIRTH CERTIFICATE',
      description: 'Enter the information about the child',
    },
  });

  const child = formResult.data as ChildData;

  showProgress(ctx, 'Close the birth certificate...');
  await click(ctx, '#image-viewer-overlay');

  // Jump to your next step here
  return await updateMasterDataStep(ctx, {...data, child});
}
