const fetchDataPage = async <T>(
  dataPageName: string,
  context: string,
  payload: Record<string, any> = {}
): Promise<T[]> => {
  try {
    const response = await PCore.getDataApiUtils().getData(dataPageName, payload, context);
    return (response.data?.data as T[]) ?? [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching data for ${dataPageName}:`, error);
    return [];
  }
};
export default fetchDataPage;
