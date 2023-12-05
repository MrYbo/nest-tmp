export interface ResponseStruct {
  success: boolean;
  statusCode: number;
  timestamp: string;
  message?: any;
  path?: string;
  data?: any;
}
