import {
  VALIDATION_ERROR_EMPTY,
  VALIDATION_ERROR_INVALID_URL,
} from "../data/constants";
import { TriggerFunction } from "./useValidationErrorMessage";

export default function useValidation() {
  return (items: Item[]) =>
    items.reduce(
      (hasPassed, item) =>
        !pipeline.every((validator) => validator(item)) && hasPassed
          ? false
          : hasPassed,
      true
    );
}

export enum Type {
  Url,
}

const pipeline = [
  // Validate that value is not empty.
  ([value, trigger]: Item) =>
    Boolean(value.trim().length) ||
    (() => {
      trigger(VALIDATION_ERROR_EMPTY);
      return false;
    })(),

  // Validate that value is a valid URL.
  ([value, trigger, type]: Item) => {
    if (type === undefined || type !== Type.Url) {
      return true;
    }

    let isValid = true;

    try {
      new URL(value);
    } catch (error) {
      isValid = false;
    }

    if (!isValid) {
      trigger(VALIDATION_ERROR_INVALID_URL);
    }

    return isValid;
  },
];

type Value = string;

type Item = [Value, TriggerFunction, Type?];
