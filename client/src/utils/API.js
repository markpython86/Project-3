import axios from "axios";

// Adding Daily functions
export default {
    // Gets all dailys
    getDailies: function() {
      return axios.get("/api/daily");
    },
    // Deletes the daily with the given id
    deleteDaily: function(id) {
      
      return axios.delete("/api/daily/"+ id );
    },
    // Gets the daily with the given id
    getDaily: function(id) {
      return axios.get("/daily/" + id);
    },
    
    // Saves a daily to the database
    saveDaily: function(dailyData) {
      return axios.post("/api/daily", dailyData);
    }
  };