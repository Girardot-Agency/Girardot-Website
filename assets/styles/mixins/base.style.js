/**
 * =Base mixins
************************************************************/

import {BASE} from "../theme/_style";

export default function (x) {
  if (x) return `${BASE.unit * x}px`;
  return `${BASE.unit}px`;
}
