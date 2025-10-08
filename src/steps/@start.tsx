import {Context} from '@matterway/sdk';
import {showUI} from '@matterway/sdk/lib/UIv2';
import {t} from 'i18next';
import manifest from 'manifest.json';
import {extractRequestDataStep} from './extractRequestDataStep';
import {enterLeaveDataStep} from './enterLeaveDataStep';
import {successStep} from './@success';
import {enterChildDataStep} from './enterChildDataStep';
import {updateMasterDataStep} from './updateMasterDataStep';

// DO NOT add your automation in this step. Rather, create another step from
// `_template.tsx`, and await it at the end of this step.

export async function startStep(ctx: Context) {
  console.log('step: startStep');

  await showUI.message(ctx, {
    title: manifest.name,
    description: manifest.description,
    text: t('start.text'),
    buttons: [{text: t('start.proceedButton'), value: 'ok'}],
  });

  const employee = await extractRequestDataStep(ctx);
  const leave = await enterLeaveDataStep(ctx);
  const child = await enterChildDataStep(ctx);
  await updateMasterDataStep(ctx, {employee, leave, child});

  await successStep(ctx);
}
