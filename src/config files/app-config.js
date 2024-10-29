// Date variables
const date = new Date();
const currentYear = new Date().getFullYear();
// 'http://127.0.0.0:8001/' 'https://pavliati.pythonanywhere.com/'

// 'https://137.184.111.7:80/'
//
const appConfig = {
    server: 'https://137.184.111.7/',
    // defaultRobotEnvironment: 'live',
    currentDate: date.toISOString().substr(0,10),
    fistDayOfCurrentYear: currentYear.toString( ) + '-01-01'
}
export default appConfig;