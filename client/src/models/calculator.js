const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Calculator = function(){
this.conversionFactors = [];
}

// gets on hold of the data of all journeys
Calculator.prototype.bindEvents = function (){
  PubSub.subscribe('Journeys:data-loaded', (evt) => {

    const carbonData = this.calculateTotalEmissions(evt.detail);
    console.log(evt.detail)
    console.log(carbonData)
    const carnbonDataFuel = this.splitCalculationByFuel(evt.detail);
  });
  // PubSub.publish('Journeys:carbon-data-loaded', carbonData);
  // PubSub.publish('Journeys:carbon-data-by-fuel', carnbonDataFuel);
}

// takes a total of all journeys and looks at the overall emissions
Calculator.prototype.calculateTotalEmissions = function(allJourneys){
  let emissionsTotal = 0;
  allJourneys.forEach ((journey )=> {
    console.log(journey)
    emissionsTotal += this.calculateEmissions(journey);
  })
  return emissionsTotal;
};

Calculator.prototype.calculateTotalDistance = function(allJourneys){
  let distanceTotal = 0;
  allJourneys.forEach ((journey )=> {
    distanceTotal += journey.distance
  })
  return distanceTotal;
}

// once form updated replace one with journey.numberOfJourneys;
Calculator.prototype.calculateEmissions = function(journey) {
    return journey.distance  * this.getConversionFactor(journey);
  };

// starts a function with a data of all journeys
// for each journey if fuel type and vehicle type are right returns a conversion factor

Calculator.prototype.getConversionFactor = function(journeySubmitted){
  console.log(journeySubmitted.vehicleType)
    if (journeySubmitted.vehicleType === 'car') {
      // return this.carJourneyFactor(journeySubmitted)
      return 45
    } else if (journeySubmitted.vehicleType === 'airplane') {
      return 0.11529
    }
      else if (journeySubmitted.vehicleType === 'train') {
      // return this.trainJourneyFactor(journeySubmitted)
      return 0.1465
    } else if (journeySubmitted.vehicleType === 'ferry') {
      return 0.12953
    } else if (journeySubmitted.vehicleType === 'motorbike'){
      return 0.12953
    }
  }

// emissions of a car / fuel type / this part does not link yet
Calculator.prototype.carJourneyFactor = function(journeySubmitted){
  if (journeySubmitted.fuelType === 'Petrol') {
    return 0.11529;
  } else if (journeySubmitted.fuelType === 'Diesel') {
    return 0.11145;
  } else if (journeySubmitted.fuelType === 'Hybrid') {
    return 2.2 +0.00622;
  }
};

Calculator.prototype.airplaneJourneyFactor = function(journeySubmitted){
  if (journeySubmitted.flightType === 'long-haul') {
    return 0.11529;
  } else if (journeySubmitted.flightType === 'international') {
    return 0.11145;
  }
};
// this is to fix
Calculator.prototype.calculateAvarageEmissionsPerJourney = function(allJourneys){
  let averageEmissions = 0; 
  for (journey of allJourneys) {
    (averageEmissions += this.calculateEmissions(journey)) / allJourneys.size
  }
  return averageEmissions ;
}


Calculator.prototype.yearlyEmissionProjection = function(allJourneys){
  return this.calculateTotalEmissions(allJourneys) * 365;
}

Calculator.prototype.yearlyDistanceProjection = function(allJourneys){
  return this.calculateTotalDistance(allJourneys) * 365;
}

Calculator.prototype.tenYearsEmissionProjection = function(allJourneys){
  return this.yearlyProjection(allJourneys) * 10;
}

Calculator.prototype.tenYearsDistanceProjection = function(allJourneys){
  return this.yearlyDistanceProjection(allJourneys) * 10;
}

// creates a hash of all emissions by fuel type
Calculator.prototype.splitCalculationByFuel = function(allJourneys) {
  const emissionsByFuelType = {}
  for (const journey of allJourneys) {
    if (emissionsByFuelType[journey.fuel]) {
      emissionsByFuelType[journey.fuel] += this.calculateEmissions(journey);
    }
    else {
      emissionsByFuelType[journey.fuel] = this.calculateEmissions(journey);
    }
  }
  return emissionsByFuelType;
}

Calculator.prototype.splitCalculationByModeOfTransport = function(allJourneys) {
  const emissionsByVehicleType = {};

  for (const journey of allJourneys) {
    if (emissionsByVehicleType[journey.vehicle]) {
      emissionsByVehicleType[journey.vehicle] += this.calculateEmissions(journey);
    }
    else {
      emissionsByVehicleType[journey.vehicle] = this.calculateEmissions(journey);
    }
  }
  return emissionsByVehicleType;
}

Calculator.prototype.splitCalculationByUseType= function(allJourneys) {
  const emissionsByUseType = {};

  for (const journey of allJourneys) {
    if (emissionsByUseType[journey.useType]) {
      emissionsByUseType[journey.useType] += this.calculateEmissions(journey);
    }
    else {
      emissionsByUseType[journey.useType] = this.calculateEmissions(journey);
    }
  }
  return emissionsByUseType;
}








// gets on hold of the data from the DB
// CarbonCalculator.prototype.allEmissionsConversionFactors = function() {
//   this.request
//     .get()
//     .then(() => {
//       this.conversionFactors = conversionFactors;
//     })
//     .catch((err) => console.error(err));
// };


module.exports = Calculator;
