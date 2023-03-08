export const checkJson = response => {
  if (response.headers.get('content-type')?.includes('application/json')) {
    return true;
  }
  return false;
};
