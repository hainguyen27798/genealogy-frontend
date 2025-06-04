export interface TError {
  success: false;
  message: string;
}

export interface TResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
}
