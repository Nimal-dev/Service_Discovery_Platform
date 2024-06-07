const mongoose =require('mongoose')


function connects(){

    mongoose.connect('mongodb://localhost:27017/All_in_One_Service_Discovery_Platform')
    .then(()=>console.log('Mongodb connected...'))
    .catch((error)=>{console.log(error)})
}

module.exports = connects
    