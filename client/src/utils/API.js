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
      return axios.put("/api/daily/" + id, dailyData);

    },
    // Saves a daily to the database
    saveDaily: function(dailyData) {
      return axios.post("/api/daily/new", dailyData);
    },

// ======= Weekly Section ======= //

    // Gets all Weeklies
    getWeeklies: function() {

      return axios.get("/api/weekly");
    },
   
    // Deletes the weekly with the given id
    deleteWeekly: function(id) {
      return axios.delete("/api/weekly/" + id);
    },

    updateWeekly: function(id, weeklyData) {
      return axios.put("/api/weekly/" + id, weeklyData);

    },
    // Saves a weekly to the database
    saveWeekly: function(weeklyData) {
      return axios.post("/api/weekly", weeklyData);
    },

    // ======= Monthly Section ======= //

    // Gets all Monthlies
    getMonthlies: function() {

      return axios.get("/api/monthly");
    },
   
    deleteMonthly: function(id) {
      return axios.delete("/api/monthly/" + id);
    },

    updateMonthly: function(id, monthlyData) {
      return axios.put("/api/monthly/" + id, monthlyData);

    },
    // Saves a monthly to the database
    saveMonthly: function(monthlyData) {
      return axios.post("/api/monthly", monthlyData);
    }
  };