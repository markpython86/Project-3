import axios from "axios";

// Adding Daily functions
export default {
    // Gets all dailys
    getDailies: function() {
      return axios.get("/api/daily");
    },
    // Deletes the daily with the given id
    // Gets the daily with the given id
    getDaily: function(id) {
      return axios.get("/daily/" + id);
    },
    // Deletes the daily with the given id
    deleteDaily: function(id) {
      return axios.delete("/api/daily/" + id);
    },

    updateDaily: function(id, dailyData) {
      return axios.put("/api/daily/" + id, dailyData);
    },
    // Saves a daily to the database
    saveDaily: function(dailyData) {
      return axios.post("/api/daily", dailyData);
    }
  };