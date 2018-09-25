const Calculator = require('./models/Calculator');
const Journeys = require('./models/journeys');
const JourneysImpactView = require('./views/journeys_impact_view');
const ChartView = require('./views/chart_view');
const CurrentView = require('./views/current_view')

document.addEventListener ('DOMContentLoaded', () => {
  
  console.log('js loaded')

  // const chartContainer = document.querySelector('#container');
  // const resultChart = new ChartView(chartContainer);
  // resultChart.bindEvents();
  
  // const allImpactDisplay = document.querySelector('#render-view')
  // const journeysImpactView = new JourneysImpactView(allImpactDisplay);
  // journeysImpactView.bindEvents();

  const journeys = new Journeys();
  journeys.bindEvents();
  journeys.getData();

  const calclculator = new Calculator();
  calclculator.bindEvents();

  const navElement = document.querySelectorAll('li');
  const currentView = new CurrentView(3, navElement);
  currentView.render();


}); 
