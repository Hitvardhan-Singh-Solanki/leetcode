export function countSeniors(details: string[]): number {
  return details.reduce(
    (acc, v) => (parseInt(v.slice(11, 13)) > 60 ? ++acc : acc),
    0
  );
}
