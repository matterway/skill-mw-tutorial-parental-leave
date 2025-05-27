import {click, showForm, showProgress, Context} from '@matterway/sdk';
import {ChildData} from 'shared/types';

export async function enterChildDataStep(ctx: Context) {
  console.log('enterChildData step');

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

  const result = formResult.data as ChildData;

  await showProgress(ctx, 'Close the birth certificate...');
  await click(ctx, '#image-viewer-overlay');

  console.log('step: enterChildDataStep end', result);
  return result;
}
