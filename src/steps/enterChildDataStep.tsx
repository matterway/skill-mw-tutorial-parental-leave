import {click, Context} from '@matterway/sdk';
import {
  bubble,
  headerBar,
  group,
  navigationBar,
  showUI,
  inputField,
  dateField,
} from '@matterway/sdk/lib/UIv2';
import {ChildData} from 'shared/types';

export async function enterChildDataStep(ctx: Context) {
  console.log('enterChildData step');

  void showUI.progress(ctx, 'Open the birth certificate...', {overlay: true});

  await click(ctx, '.open-attachment:nth-child(2)');

  const form: any = await showUI(
    ctx,
    bubble([
      headerBar({
        title: 'BIRTH CERTIFICATE',
        description: 'Enter the information about the child',
      }),
      group([
        inputField({
          name: 'firstName',
          label: 'First name',
          required: true,
          validationMessage: 'This field is required',
        }),
        inputField({
          name: 'lastName',
          label: 'Last name',
          required: true,
          validationMessage: 'This field is required',
        }),
        dateField({
          name: 'birthDate',
          label: 'Date of birth',
          required: true,
          validationMessage: 'This field is required',
        }),
      ]),
      navigationBar({buttons: [{text: 'Submit', value: 'proceedButton'}]}),
    ]),
  );

  const result = form.state as ChildData;

  void showUI.progress(ctx, 'Close the birth certificate...', {overlay: true});
  await click(ctx, '#image-viewer-overlay');

  console.log('step: enterChildDataStep end', result);
  return result;
}
