import fetchAPI from "../config files/api";

export const searchUsers = async (query) => {
  const response = await fetchAPI.get("users/search/", { params: { q: query } });
  return response.data;
};

export const searchPortfolios = async (query) => {
  const response = await fetchAPI.get("portfolios/search/", { params: { q: query } });
  return response.data;
};

export const searchInstruments = async (query) => {
  if (!query) return [];

  try {
    const response = await fetchAPI.get("instruments/get/instruments/", {
      params: { name: query },
    });

    return response.data || [];
  } catch (error) {
    console.error("Error fetching instruments:", error);
    return [];
  }
};