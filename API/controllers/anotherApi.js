const axios = require('axios');
exports.GET_FROM_ANOTHER_API = (req, res, next) => {
    const url = 'https://www.yad2.co.il/api/pre-load/getFeedIndex/realestate/rent?area=5&page=5'
    axios.get(url)
    .then(response => {
        console.log('working :', response.data )
        res.status(200).json({success: true, data: response.data})
    })
    .catch(err => {
        console.log('Not working :', err)
        res.status(500).json({success: false, Error: err.response.data})
    })
}