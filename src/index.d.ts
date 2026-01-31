declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";

interface APIError {
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { message: string; errorData?: any };
}
