const mongoose = require('mongoose')

if ( process.argv.length < 3) {
    console.log('give password as an argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kalle:${password}@person-app-ocako.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if ( process.argv.length < 5 ) {
    Person
        .find({})
        .then(response => {
            console.log('puhelinluettelo:')
            response.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
} else {

    const personName = process.argv[3]
    const personNumber = process.argv[4]

    const person = new Person({
        name: personName,
        number: personNumber
    })

    person.save().then(response => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}