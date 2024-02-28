export const getLongLat = async (
  city: string,
  postcode: number,
  subdistrict: string,
  village: string,
  state: string,
) => {
  try {
    const apiKey = '5440eeab471842aabf2fc32d39aeb815';
    const query = `${city}, ${postcode}, ${state}, ${subdistrict}, ${village} `;
    const openCage = 'https://api.opencagedata.com/geocode/v1/json';

    const request_url =
      openCage +
      '?' +
      'key=' +
      apiKey +
      '&q=' +
      encodeURIComponent(query) +
      '&pretty=1' +
      '&no_annotations=1';

    console.log(request_url);

    const response = await fetch(request_url);
    const responseData = await response.json();

    return responseData;

    return responseData;
  } catch (error) {
    throw error;
  }
};
