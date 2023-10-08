// Date variables
const date = new Date();
const currentYear = new Date().getFullYear();
// 'http://127.0.0.1:8000/' 'https://pavliati.pythonanywhere.com/'
const appConfig = {
    server: 'http://127.0.0.1:8000/',
    defaultRobotEnvironment: 'live',
    currentDate: date.toISOString().substr(0,10),
    fistDayOfCurrentYear: currentYear.toString( ) + '-01-01'
}
export default appConfig;