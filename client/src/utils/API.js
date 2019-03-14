import axios from "axios";

// Adding Daily functions
export default {
    // Gets all dailys
    getDailies: function() {
      return axios.get("/api/daily");
    },
    // Gets the daily with the given id
    getDaily: function(id) {
      return axios.get("/api/daily/" + id);
    },
    // Deletes the daily with the given id
    deleteDaily: function(id) {
      return axios.delete("/api/daily/" + id);
    },
    // Saves a daily to the database
    saveDaily: function(dailyData) {
      return axios.post("/api/daily", dailyData);
    }
  };