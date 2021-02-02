const express = require('express')
const oebb = require('oebb')
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
app.use(bodyParser.json())

app.get('/autoComplete', (req, res) => {
    var name = req.body.name;
    var amount = req.body.amount;
    oebb.stations.search(name, {results: amount}).then(value => {
        var stationNames = new Array();
        value.forEach(element => {
            stationNames.push({id: element.id,
                name: element.name});
        });
        res.send(stationNames);
    })
});

app.post('/getJourney', (req,res) => {
    req.props = Object.assign(req.query, req.params, req.body);
    var id1 = req.props.firstId;
    var id2 = req.props.secondId;
    var amount = req.props.amount;
    var avgPrice = 0;

    console.log(amount);
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
