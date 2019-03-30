import axios from "axios";

export default {

// ======= Daily Sections ======= // 

    // Gets all dailies
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
      console.log('daily data', dailyData)
      return axios.put("/api/daily/" + id, dailyData);

    },
    // Saves a daily to the database
    saveDaily: function(dailyData) {
      return axios.post("/api/daily", dailyData);
    },

// ======= Weekly Section ======= //

    // Gets all Weeklies
    getWeeklies: function() {
      
      return axios.get("/api/weekly");
    },
    // Gets the weekly with the given id
    getWeekly: function(id) {
      return axios.get("/weekly/" + id);
    },
    // Deletes the weekly with the given id
    deleteWeekly: function(id) {
      return axios.delete("/api/weekly/" + id);
    },

    updateWeekly: function(id, weeklyData) {
      console.log('weekly data', weeklyData)
      return axios.put("/api/weekly/" + id, weeklyData);

    },
    // Saves a weekly to the database
    saveWeekly: function(weeklyData) {
      return axios.post("/api/weekly", weeklyData);
    }
  };