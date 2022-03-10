type BaseResponse = {
  success: boolean;
  message: string;
};

type ImageFormat = 'png' | 'jpg' | 'jpeg';

type ResizeImageQuery = {
  filename: string;
  width: string;
  height: string;
  format?: ImageFormat;
};
