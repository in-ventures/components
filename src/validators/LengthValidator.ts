/*
 * File: PhoneValidator.ts
 * Project: @inventures/react-lib
 * File Created: Friday, 14th August 2020 3:09:48 pm
 * Author: Esperanza Horn (esperanza@inventures.cl)
 * -----
 * Last Modified: Tuesday, 29th September 2020 2:39:09 pm
 * Modified By: Esperanza Horn (esperanza@inventures.cl)
 * -----
 * Copyright 2020 - 2020 Incrementa Ventures SpA. ALL RIGHTS RESERVED
 * Terms and conditions defined in license.txt
 * -----
 * Inventures - www.inventures.cl
 */

import { Validator } from './Validator';

type LengthType =
  | {
      min?: number;
      max: number;
    }
  | {
      min: number;
      max?: number;
    }
  | number;

export class LengthValidator extends Validator {
  requiredLength?: number;
  minLength?: number;
  maxLength?: number;
  constructor(errorMsg: string, length: LengthType) {
    super(errorMsg);
    if (typeof length === 'number') {
      this.requiredLength = length;
      return;
    }
    this.minLength = length.min ? length.min : -Infinity;
    this.maxLength = length.max ? length.max : Infinity;
    //this.minLength = length.min;
    //this.maxLength = length.max;
  }

  validate(input: string) {
    // In case of single required length
    if (this.requiredLength) {
      return Boolean(input.length === this.requiredLength);
    }
    // In case of range length
    if (!this.minLength || !this.maxLength) return false;
    return Boolean(
      input.length >= this.minLength && input.length <= this.maxLength,
    );
  }

  get _tag() {
    return this.errorMsg + `-${this.requiredLength}`;
  }
}
