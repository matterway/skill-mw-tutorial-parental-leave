export default function matcher(window: Window) {
  const URL = 'https://hr-service-desk.demo.matterway.io/ticket';
  const isServiceDeskTicket = window.location.href.includes(URL);

  const ID = 'sys_display.incident.category';
  const value = window.document.getElementById(ID)?.getAttribute('value');
  const isParentalLeaveTicket = value === 'Parental leave';

  return isServiceDeskTicket && isParentalLeaveTicket;
}
