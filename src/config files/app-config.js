// Date variables
const date = new Date();
const currentYear = new Date().getFullYear();
// 'http://127.0.0.0:8001/'
//https://www.fractalportfolios.com/

const appConfig = {
    server: 'http://127.0.0.0:8001/',
    currentDate: date.toISOString().substr(0,10),
    fistDayOfCurrentYear: currentYear.toString( ) + '-01-01'
}
export default appConfig;