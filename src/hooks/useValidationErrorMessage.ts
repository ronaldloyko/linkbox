import { useState } from "react";
import {
  VALIDATION_ERROR_EMPTY,
  VALIDATION_ERROR_INVALID_URL,
} from "../data/constants";
import i18n from "../i18n";

export default function useValidationErrorMessage() {
  const [message, setMessage] = useState<Message>(EMPTY_ERROR_MESSAGE);

  return [
    message,
    (type: MessageIdentifier) => {
      if (!Object.hasOwn(MESSAGES, type)) {
        throw new Error("Unknown error message identifier");
      }

      setMessage(i18n.t(MESSAGES[type]));
    },
    () => {
      setMessage(EMPTY_ERROR_MESSAGE);
    },
  ] as Hook;
}

export type TriggerFunction = (type: MessageIdentifier) => void;

type Hook = [Message, TriggerFunction, ClearFunction];

type Message = string | null;

type ClearFunction = () => void;

type MessageIdentifier =
  | typeof VALIDATION_ERROR_EMPTY
  | typeof VALIDATION_ERROR_INVALID_URL;

const EMPTY_ERROR_MESSAGE = null;

const TRANSLATION_PREFIX = "validation.";

const MESSAGES = Object.fromEntries(
  [VALIDATION_ERROR_EMPTY, VALIDATION_ERROR_INVALID_URL].map((identifier) => [
    identifier,
    TRANSLATION_PREFIX + identifier,
  ])
) as Record<MessageIdentifier, string>;
