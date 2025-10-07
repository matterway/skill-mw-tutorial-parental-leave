import {Context, click} from '@matterway/sdk';
import {
  bubble,
  dateField,
  headerBar,
  group,
  navigationBar,
  showUI,
} from '@matterway/sdk/lib/UIv2';
import {LeaveData} from 'shared/types';

export async function enterLeaveDataStep(ctx: Context) {
  console.log('step: enterLeaveDataStep');

  void showUI.progress(ctx, 'Open the leave request...', {overlay: true});
  await click(ctx, '.open-attachment:nth-child(1)');

  const form: any = await showUI(
    ctx,
    bubble([
      headerBar({
        title: 'LEAVE REQUEST',
        description: 'Enter the terms for the leave of absence',
      }),
      group([
        dateField({
          name: 'startDate',
          label: 'Start of leave',
          required: true,
          validationMessage: 'This field is required',
        }),
        dateField({
          name: 'endDate',
          label: 'End of leave',
          required: true,
          validationMessage: 'This field is required',
        }),
      ]),
      navigationBar({buttons: [{text: 'Submit', value: 'proceedButton'}]}),
    ]),
  );

  const result = form.state as LeaveData;

  void showUI.progress(ctx, 'Close the leave request...', {overlay: true});
  await click(ctx, '#image-viewer-overlay');

  console.log('step: enterLeaveDataStep end', result);
  return result;
}
