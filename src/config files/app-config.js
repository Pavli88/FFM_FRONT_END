// Date variables
const date = new Date();
const currentYear = new Date().getFullYear();
// 'http://127.0.0.1:8000/' 'https://pavliati.pythonanywhere.com/'
const appConfig = {
    server: 'http://127.0.0.1:8000/',
    defaultEnvironment: 'live',
    current_date: date.toISOString().substr(0,10),
    fist_day_of_current_year: currentYear.toString( ) + '-01-01'
}
export default appConfig;