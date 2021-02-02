const express = require('express')
const oebb = require('oebb')
const bodyParser = require('body-parser')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const app = express();
const port = 8000;
app.use(bodyParser.json())

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Ticketer API",
            version: '1.0.0',
            description: 'The API for getting information from the Austrian Federal Railways (ÖBB)'
        }
    },
    apis: ['index.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

/**
 * @swagger
 * /autoComplete:
 *  get:
 *      description: Autocomplete the input from the user
 *      parameters:
 *      - name: name
 *        description: The text the user is searching
 *        in: query
 *        required: true
 *        type: string
 *      - name: amount
 *        description: The amount of railway stations names you want to receive
 *        in: query
 *        required: true
 *        type: number
 *      responses:
 *          200:
 *              description: Success
 */
app.get('/autoComplete', (req, res) => {
    req.props = Object.assign(req.query, req.params, req.body);
    var name = req.props.name;
    var amount = req.props.amount;
    oebb.stations.search(name, {results: amount}).then(value => {
        var stationNames = new Array();
        value.forEach(element => {
            stationNames.push({id: element.id,
                name: element.name});
        });
        res.send(stationNames);
    })
});


/**
 * @swagger
 * /getJourney:
 *  post:
 *      description: Getting Journey between two points
 *      parameters:
 *      - name: firstId
 *        description: The Id of the first railway station
 *        in: query
 *        required: true
 *        type: string
 *      - name: secondId
 *        description: The Id of the second railway station
 *        in: query
 *        required: true
 *        type: string
 *      - name: amount
 *        description: The amount of connections you want to recieve
 *        in: query        
 *        required: true
 *        type: string
 *      responses:
 *          201:
 *              description: Success
 */
app.post('/getJourney', (req,res) => {
    req.props = Object.assign(req.query, req.params, req.body);
    var id1 = req.props.firstId;
    var id2 = req.props.secondId;
    var amount = req.props.amount;
    var avgPrice = 0;

    oebb.journeys(id1, id2, {results: Number(amount)}).then(value => {
        var routes = new Array();
        var legs = new Array();

        value.forEach(element => {
            element.legs.forEach(queryLegs => {
                legs.push({
                    origin: {
                        id: queryLegs.origin.id,
                        name: queryLegs.origin.name
                    },
                    destination: {
                        id: queryLegs.destination.id,
                        name: queryLegs.destination.name
                    },
                    departure: {
                        time: queryLegs.departure,
                        plattform: queryLegs.departurePlatform
                    },
                    arrival:{
                        arrival: queryLegs.departure,
                        arrivalPlatform: queryLegs.departurePlatform
                    },
                    lineName: queryLegs.line.name
                })
            });



            routes.push({
                legs: legs,
                price: element.price != null ? element.price.amount : null
            });

            if(element.price != null){
                avgPrice += element.price.amount;
            }
            else{
                amount--;
            }
        });

        res.send({
            routes: routes,
            avgPrice: avgPrice/amount
        });
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
