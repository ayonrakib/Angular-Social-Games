export default function getErrorFormat(
  errorCode: number,
  errorMessage: string
): { errorCode: number; errorMessage: string } {
  return {
    errorCode,
    errorMessage,
  };
}
