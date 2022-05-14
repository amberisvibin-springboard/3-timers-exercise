describe("Vehicle Object Tests", function() {
    let vehicle = new Vehicle("Honda", "Monster Truck", 1999);
    it('should be valid Vehicle object', function () {
        expect(vehicle).toBeInstanceOf(Object);
        expect(vehicle).toBeInstanceOf(Vehicle);
        expect(vehicle.make).toBe("Honda");
        expect(vehicle.model).toBe("Monster Truck");
        expect(vehicle.year).toBe(1999);
    });
    it('should have valid honk() method', function () {
        expect(vehicle.honk).toBeInstanceOf(Function);
        expect(vehicle.honk()).toBe("Beep.");
    });
    it('should have valid toString() method', function () {
        expect(vehicle.toString).toBeInstanceOf(Function);
        expect(vehicle.toString()).toBe("The vehicle is a Honda Monster Truck from 1999.");
    });
});

describe("Car Object Tests", function() {
    let car = new Car("Toyota", "Corolla", 2005);
    it('should be valid Vehicle object', function () {
        expect(car).toBeInstanceOf(Object);
        expect(car).toBeInstanceOf(Vehicle);
        expect(car).toBeInstanceOf(Car);
        expect(car.make).toBe("Toyota");
        expect(car.model).toBe("Corolla");
        expect(car.year).toBe(2005);
    });
    it('should inherit valid Vehicle methods', function () {
        expect(car.honk).toBeInstanceOf(Function);
        expect(car.honk()).toBe("Beep.");
        expect(car.toString).toBeInstanceOf(Function);
        expect(car.toString()).toBe("The vehicle is a Toyota Corolla from 2005.");
    });
    it('should have valid added Car property', function () {
        expect(car.numWheels).toBe(4);
    });
});

describe("Motorcycle Object Tests", function() {
    let motorcycle = new Motorcycle("Honda", "Nighthawk", 2000);
    it('should be valid Vehicle object', function () {
        expect(motorcycle).toBeInstanceOf(Object);
        expect(motorcycle).toBeInstanceOf(Vehicle);
        expect(motorcycle).toBeInstanceOf(Motorcycle);
        expect(motorcycle.make).toBe("Honda");
        expect(motorcycle.model).toBe("Nighthawk");
        expect(motorcycle.year).toBe(2000);
    });
    it('should inherit valid Vehicle methods', function () {
        expect(motorcycle.honk).toBeInstanceOf(Function);
        expect(motorcycle.honk()).toBe("Beep.");
        expect(motorcycle.toString).toBeInstanceOf(Function);
        expect(motorcycle.toString()).toBe("The vehicle is a Honda Nighthawk from 2000.");
    });
    it('should have valid added Motorcycle properties', function () {
        expect(motorcycle.numWheels).toBe(2);
        expect(motorcycle.revEngine).toBeInstanceOf(Function);
        expect(motorcycle.revEngine()).toBe("VROOM!!!");
    });
});

describe("Garage Object Tests", function() {
    it('should be a valid Garage object', function () {
        let garage = new Garage(2);
        expect(garage).toBeInstanceOf(Object);
        expect(garage).toBeInstanceOf(Garage);
        expect(garage.vehicles).toBeInstanceOf(Array);
        expect(garage.vehicles.length).toBe(0);
        expect(garage.capacity).toBe(2);
    });
    it('should have valid add() method', function () {
        let garage = new Garage(1);
        expect(garage.add("notCar")).toBe("Only vehicles are allowed in here!");
        expect(garage.add(new Car("Hyundai", "Elantra", 2015))).toBe("Vehicle added!");
        expect(garage.add(new Motorcycle("Honda", "Nighthawk", 2000))).toBe("Sorry, we're full.");
    });
});