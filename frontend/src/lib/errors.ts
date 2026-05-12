import axios from "axios";

export type AppError = {
  title: string;
  message: string;
  status?: number;
  code?: string;
  cause?: unknown;
};

type ErrorFallback = {
  title?: string;
  message?: string;
};

const DEFAULT_ERROR_TITLE = "Что-то пошло не так";
const DEFAULT_ERROR_MESSAGE = "Попробуйте повторить действие позже.";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getStringField = (source: Record<string, unknown>, key: string) => {
  const value = source[key];
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
};

const getApiMessage = (data: unknown): string | undefined => {
  if (typeof data === "string" && data.trim().length > 0) {
    return data;
  }

  if (Array.isArray(data)) {
    const messages = data
      .map((item) => (isRecord(item) ? getStringField(item, "msg") : undefined))
      .filter((message): message is string => Boolean(message));

    return messages.length > 0 ? messages.join("; ") : undefined;
  }

  if (!isRecord(data)) {
    return undefined;
  }

  const directMessage =
    getStringField(data, "message") ??
    getStringField(data, "detail") ??
    getStringField(data, "error");

  if (directMessage) {
    return directMessage;
  }

  return getApiMessage(data.detail);
};

export function toAppError(error: unknown, fallback: ErrorFallback = {}): AppError {
  const title = fallback.title ?? DEFAULT_ERROR_TITLE;
  const fallbackMessage = fallback.message ?? DEFAULT_ERROR_MESSAGE;

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;
    const message =
      getApiMessage(data) ??
      (error.response ? fallbackMessage : "Нет соединения с сервером.");

    const code =
      (isRecord(data) && getStringField(data, "code")) ??
      error.code;

    return {
      title,
      message,
      status,
      code,
      cause: error,
    };
  }

  if (error instanceof Error) {
    return {
      title,
      message: error.message || fallbackMessage,
      cause: error,
    };
  }

  if (typeof error === "string" && error.trim().length > 0) {
    return {
      title,
      message: error,
      cause: error,
    };
  }

  return {
    title,
    message: fallbackMessage,
    cause: error,
  };
}

export function getErrorMessage(error: unknown, fallbackMessage = DEFAULT_ERROR_MESSAGE) {
  return toAppError(error, { message: fallbackMessage }).message;
}
