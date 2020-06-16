//creates a database
db use mongo_test_queries;

//prepare initial data insert 
data = [
        {name: 'Airon', email: 'airondev@gmail.com', address: 'Minna'}, 
        {name: 'Ruth', email: 'ruth@mail.com', address: 'Keffi'}, 
        {name:'Jack', email: 'jack@gmail.com', address: 'Lagos'},
    ]

//creates a collection and aswell insert the document specified
db.users.insert(data)

 //Inserts a single document into users collection of mongo_test_queries db
db.users.insertOne({name: 'Favour', email: 'fav@gmail.com', address: 'ibadan', gender: 'female'})

 // retrieves all documents in users collection
db.users.find()

//find - AND #all conditions must be met
db.users.find({name: 'Airon', email: 'airondev@gmail.com'})

//find - OR #either name or email match
db.users.find({
    $or: [{name: 'Airon', email: 'airondev@gmail.com'}]
})

//Update a document in collection
db.users.updateOne(
    {name: 'Airon'},
    {$set: {email: 'airondev@mongo.com'}}
)

//Update a document in collection by adding a new element # The update command does th work of updateOne() and updateMany()
db.users.update(
    {name: 'Airon'},
    {$set: {gender: 'male'}}
)

//deleteOne() deletes only the first matched entry as specified
db.users.deleteOne({name: 'Favour'})

//deleteMany() deletes all matched entry as specified from collection
db.users.deleteMany({name: 'Favour'})

//remove() removes all matched entries unless a count is specified
db.users.remove({name:'Favour'}, 1)