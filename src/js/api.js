export const api = {
  base: 'http://localhost:3000',

  get: async (param) => {
    try {
      const response = await fetch(`${api.base}${param}`);
      if (!response.ok) throw new Error("failed to obtained data");
      return await response.json();
    } catch (error) {
      console.error("GET:", error);
      throw error;
    }
  },

  post: async (param, data) => {
    try {
      const response = await fetch(`${api.base}${param}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error loading");
      return await response.json();
    } catch (error) {
      console.error("POST:", error);
      throw error;
    }
  },

  put: async (param, data) => {
    try {
      const response = await fetch(`${api.base}${param}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error updating data");
      return await response.json();
    } catch (error) {
      console.error("PUT:", error);
      throw error;
    }
  },

  del: async (param) => {
    try {
      const response = await fetch(`${api.base}${param}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error when deleting data");
      return await response.json();
    } catch (error) {
      console.error("DELETE:", error);
      throw error;
    }
  },
};
