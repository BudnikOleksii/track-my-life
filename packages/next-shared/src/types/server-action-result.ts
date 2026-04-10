export interface ServerActionSuccess<T> {
  ok: true;
  data: T;
}

export interface ServerActionError {
  ok: false;
  error: string;
}

export type ServerActionResult<T> = ServerActionSuccess<T> | ServerActionError;
