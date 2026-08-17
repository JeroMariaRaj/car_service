// Customer Data Management Mock Backend

const defaultVehicles = [
    { id: 'v1', make: 'BMW', model: 'M3', year: 2021, regNumber: 'ABC-1234', mileage: 24500 },
    { id: 'v2', make: 'Toyota', model: 'Camry', year: 2019, regNumber: 'XYZ-7890', mileage: 45000 }
];

const defaultServiceHistory = [
    { id: 'BKG-9128', vehicleId: 'v1', regNumber: 'ABC-1234', service: 'Brake Repair', date: '2026-07-15', amount: 189.00, status: 'Completed', invoiceUrl: '#' },
    { id: 'BKG-4451', vehicleId: 'v1', regNumber: 'ABC-1234', service: 'Oil Change', date: '2026-03-10', amount: 49.00, status: 'Completed', invoiceUrl: '#' },
    { id: 'BKG-1122', vehicleId: 'v2', regNumber: 'XYZ-7890', service: 'Engine Diagnostics', date: '2025-11-05', amount: 99.00, status: 'Completed', invoiceUrl: '#' }
];

// Safe JSON parse helper
function safeParse(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        console.warn("Corrupted data for " + key + ", resetting.");
        return null;
    }
}

// Initialize localStorage if empty
function initCustomerData() {
    let vehicles = safeParse('my_vehicles');
    if (!vehicles || vehicles.length === 0) {
        const mockVehicles = [
            { id: 'v1', make: 'Honda', model: 'Civic', year: 2022, regNumber: 'HND-5678', mileage: 12500 },
            { id: 'v2', make: 'Ford', model: 'Mustang', year: 2020, regNumber: 'FRD-1234', mileage: 34000 }
        ];
        localStorage.setItem('my_vehicles', JSON.stringify(mockVehicles));
    }
    
    let history = safeParse('service_history');
    if (!history || history.length === 0) {
        const mockHistory = [
            { id: 'BKG-9128', vehicleId: 'v1', regNumber: 'HND-5678', service: 'Brake Repair', date: '2026-07-15', amount: 189.00, status: 'Completed', invoiceUrl: '#' },
            { id: 'BKG-4451', vehicleId: 'v1', regNumber: 'HND-5678', service: 'Oil Change', date: '2026-03-10', amount: 49.00, status: 'Completed', invoiceUrl: '#' },
            { id: 'BKG-1122', vehicleId: 'v2', regNumber: 'FRD-1234', service: 'Engine Diagnostics', date: '2025-11-05', amount: 99.00, status: 'Completed', invoiceUrl: '#' }
        ];
        localStorage.setItem('service_history', JSON.stringify(mockHistory));
    }
    
    let bookings = safeParse('bookings');
    if (!bookings || bookings.length === 0) {
        const activeBookings = [
            { 
                id: 'BKG-9999',
                customerDetails: { name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567' },
                vehicleDetails: { make: 'Honda', model: 'Civic', year: '2022', regNumber: 'HND-5678' },
                appointmentDetails: { date: new Date().toISOString().split('T')[0], time: '14:00' },
                packageName: 'Premium Care',
                grandTotal: 198,
                status: 'In Service'
            },
            { 
                id: 'BKG-8888',
                customerDetails: { name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543' },
                vehicleDetails: { make: 'Ford', model: 'Mustang', year: '2020', regNumber: 'FRD-1234' },
                appointmentDetails: { date: '2026-08-25', time: '10:00' },
                packageName: 'Standard Service',
                grandTotal: 89,
                status: 'Confirmed'
            }
        ];
        localStorage.setItem('bookings', JSON.stringify(activeBookings));
    }
    
    if (!safeParse('my_packages')) {
        localStorage.setItem('my_packages', JSON.stringify([]));
    }
}

// Data Access Helpers
const CustomerData = {
    getVehicles: () => safeParse('my_vehicles') || [],
    saveVehicles: (vehicles) => localStorage.setItem('my_vehicles', JSON.stringify(vehicles)),
    
    getServiceHistory: () => safeParse('service_history') || [],
    saveServiceHistory: (history) => localStorage.setItem('service_history', JSON.stringify(history)),
    
    getBookings: () => safeParse('bookings') || [],
    saveBookings: (bookings) => localStorage.setItem('bookings', JSON.stringify(bookings)),
    
    deleteBooking: (id) => {
        let bookings = CustomerData.getBookings();
        bookings = bookings.filter(b => b.id !== id);
        CustomerData.saveBookings(bookings);
    },
    
    updateBooking: (updatedBooking) => {
        let bookings = CustomerData.getBookings();
        const index = bookings.findIndex(b => b.id === updatedBooking.id);
        if (index >= 0) {
            bookings[index] = updatedBooking;
            CustomerData.saveBookings(bookings);
        }
    },
    
    getPackages: () => safeParse('my_packages') || [],
    savePackages: (packages) => localStorage.setItem('my_packages', JSON.stringify(packages)),

    getVehicleById: (id) => CustomerData.getVehicles().find(v => v.id === id),
    getVehicleByReg: (reg) => CustomerData.getVehicles().find(v => v.regNumber === reg),
    
    getTotalSpent: () => {
        const history = CustomerData.getServiceHistory();
        return history.reduce((total, record) => total + record.amount, 0);
    }
};

// Run initialization immediately
initCustomerData();
