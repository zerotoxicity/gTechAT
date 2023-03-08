export const checkJson = response => {
  if (response.headers.get('content-type')?.includes('application/json')) {
    console.log('yes');
    return true;
  }
  return false;
};
