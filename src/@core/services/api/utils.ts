import axios, { AxiosError } from "axios";

interface AxiosResponseMessage {
  title: string;
  description: string;
}

export function fmtAxiosMessage(error: unknown): AxiosResponseMessage {
  const fallback = {
    title: "Ops..",
    description:
      "Ocorreu um erro interno e sua solicitação não pode ser atendida.",
  };

  if (axios.isAxiosError<AxiosError>(error)) {
    const message = error.response?.data?.message;

    return {
      title: "Ops..",
      description: message ?? fallback.description,
    };
  }

  return fallback;
}