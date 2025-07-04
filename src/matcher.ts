import {MatcherResult} from '@matterway/types';

export default function matcher(window: Window): MatcherResult {
  const EXPECTED_ORIGIN = 'https://hr-service-desk.demo.matterway.io';
  const EXPECTED_PATH = '/ticket';

  try {
    const currentUrl = new URL(window.location.href);
    const isServiceDeskTicket =
      currentUrl.origin === EXPECTED_ORIGIN &&
      currentUrl.pathname.startsWith(EXPECTED_PATH);

    const ID = 'sys_display.incident.category';
    const value = window.document.getElementById(ID)?.getAttribute('value');
    const isParentalLeaveTicket = value === 'Parental leave';

    return isServiceDeskTicket && isParentalLeaveTicket;
  } catch (error) {
    // Invalid URL format
    return false;
  }
}
