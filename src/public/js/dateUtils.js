export function timeFormate(date) {
  let Y = date.getFullYear();
  let M = date.getMonth()+1;
  M = (M <10 ? '0'+M:M);
  let D = (date.getDate()<10? '0'+date.getDate():date.getDate());
  return Y+'-'+M+'-'+D
}
